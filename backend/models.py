from pydantic import BaseModel, HttpUrl
from typing import List

class Project(BaseModel):
    """
    Schema representing a portfolio project.
    Strictly enforces correct data types.
    """
    id: int
    title_key: str
    desc_key: str
    link: HttpUrl
