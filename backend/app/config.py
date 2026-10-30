import os

class Settings:
    PROJECT_NAME: str = "Health Insurance Pre-Authorisation Desk API"
    VERSION: str = "1.0.0"
    API_PREFIX: str = "/api/v1"
    
    # Paths
    BASE_DIR: str = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    CORPUS_PATH: str = os.path.join(os.path.dirname(BASE_DIR), "corpus", "Insurer_Policy_Wording_and_DayCare_List.md")
    DB_PATH: str = os.path.join(BASE_DIR, "preauth_desk.db")
    
    # Prompts & Models
    DEFAULT_PROMPT_VERSION: str = "v1"
    MAX_AGENT_STEPS: int = 8
    MAX_TOOL_CALLS: int = 12
    MAX_RETRIES: int = 3
    
    # Rate Limits & Cache
    RATE_LIMIT_RPS: int = 50
    REDIS_HOST: str = os.getenv("REDIS_HOST", "localhost")
    REDIS_PORT: int = int(os.getenv("REDIS_PORT", 6379))

settings = Settings()
