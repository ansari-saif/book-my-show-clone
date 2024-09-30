import logging
from datetime import datetime, timedelta, timezone

import jwt
from jwt.exceptions import InvalidTokenError

from app.core import security
from app.core.config import settings
import random
import string

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def generate_password_reset_token(email: str) -> str:
    delta = timedelta(hours=settings.EMAIL_RESET_TOKEN_EXPIRE_HOURS)
    now = datetime.now(timezone.utc)
    expires = now + delta
    exp = expires.timestamp()
    encoded_jwt = jwt.encode(
        {"exp": exp, "nbf": now, "sub": email},
        settings.SECRET_KEY,
        algorithm=security.ALGORITHM,
    )
    return encoded_jwt


def verify_password_reset_token(token: str) -> str | None:
    try:
        decoded_token = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[security.ALGORITHM]
        )
        return str(decoded_token["sub"])
    except InvalidTokenError:
        return None


def random_lower_string(length: int = 12) -> str:
    return ''.join(random.choices(string.ascii_lowercase, k=length))

def random_email() -> str:
    return f"{random_lower_string()}@example.com"
