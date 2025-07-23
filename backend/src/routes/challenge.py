from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel
from sqlalchemy.orm import Session

from ..ai_generator import generate_challenge_with_ai
from ..database.db import (
    create_challenge,
    create_challenge_quota,
    get_challenge_quota,
    get_user_challenges,
    reset_quota_if_needed
)

from ..database.models import get_db
from ..utils import authenticate_and_get_user_details

import json
from datetime import datetime


router = APIRouter()


class ChallengeRequest(BaseModel):
    difficulty: str

    class Config:
        json_schema_extra = {"example": {"difficulty": "easy"}}


@router.post('/generate-challenge')
async def generate_challenge(request: ChallengeRequest, request_obj: Request, db: Session = Depends(get_db)):
    try:
        user_details = authenticate_and_get_user_details(request_obj)
        user_id = user_details.get('user_id')

        quota = get_challenge_quota(db, user_id)
        if not quota:
            quota = create_challenge_quota(db, user_id)

        quota = reset_quota_if_needed(db, quota)

        if quota.last_reset_date <= 0:
            raise HTTPException(status_code=429, detail="Quota exhausted")

        challenge_data = generate_challenge_with_ai(request.difficulty)

        new_challenge = create_challenge(
            db=db,
            difficulty=request.difficulty,
            created_by=user_id,
            title=challenge_data['title'],
            options=json.dumps(challenge_data['opstions']),
            correct_answer_id=challenge_data['correct_answer_id'],
            explanation=challenge_data['explanation']
        )
        quota.quota_remaining -= 1
        db.commit()

        return {
            "id": new_challenge.id,
            'title': new_challenge.title,
            'difficulty': new_challenge.difficulty,
            'options': json.loads(new_challenge.options),
            'correct_answer_id': new_challenge.correct_answer_id,
            'explanation': new_challenge.explanation

        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/my-history")
async def my_history(request: Request, db: Session = Depends(get_db)):
    user_details = authenticate_and_get_user_details(request)
    user_id = user_details.get('user_id')

    challenges = get_user_challenges(db, user_id)
    return {'challenges': challenges}
