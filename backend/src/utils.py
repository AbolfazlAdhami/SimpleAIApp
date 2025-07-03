from fastapi import HTTPException
from clerk_backend_api import Clerk, AuthenticateRequestOptions
import os
from dotenv import load_dotenv

load_dotenv()

clerk_sdk = Clerk(os.getenv("CLERK_SECRET_KEY"))


def authenticate_get_user_details(request):

    try:
        request_state = clerk_sdk.authenticate_request(
            request, AuthenticateRequestOptions(
                authorized_parties=['http://localhost:5174', 'http://localhost:5173'], jwt_key=os.getenv('JWT_KEY'))

        )
        if not request_state.is_signed_in:
            raise HTTPException(status_code=401, detail='Invalid Token')
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
