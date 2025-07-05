from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel
from sqlalchemy.orm import Session
from ..database.db import (
    get_challenge_quota, create_challenge, create_challenge_quota, get_user_challenges, reset_quota_if_needed
)
from ..utils import authenticate_get_user_details
from ..database.models import get_db
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
        user_details = authenticate_get_user_details(request=request_obj)
        user_id = user_details.get('user_id')

        quota = get_challenge_quota(db=db, user_id=user_id)

        if quota.quota_remaining <= 0:
            raise HTTPException(status_code=429, detail="Quota exhausted")

        challenge_data = generate_challenge_with_ai(request.difficulty)

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get('/my-history')
async def my_history(request: Request, db: Session = Depends(get_db)):
    user_details = authenticate_get_user_details(request=request)
    user_id = user_details.get('user_id')

    challenges = get_challenge_quota(db=db, user_id=user_id)
    return {'challenges': challenges}


@router.get('/quota')
async def get_quota(request: Request, db: Session = Depends(get_db)):
    user_details = authenticate_get_user_details(request)
    user_id = user_details.get('user_id')

    quota = get_challenge_quota(db, user_id)
    if not quota:
        return {
            'user_id': user_id,
            'quota_remaining': 0,
            'last_reset_date': datetime.now()
        }
    quota = reset_quota_if_needed(db=db, quota=quota)
    return quota
