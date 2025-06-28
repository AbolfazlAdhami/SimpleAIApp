from fastapi import FastApi, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from clerk_backend_api import Clerk
import os


clerk_sdk = Clerk(os.getenv("CLERK_SECRET_KEY"))

app = FastApi()
app.add
