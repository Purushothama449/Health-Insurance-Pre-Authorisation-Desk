import re
from typing import Tuple

PROMPT_INJECTION_PATTERNS = [
    r"ignore (all )?previous instructions",
    r"approve automatically",
    r"reveal system prompt",
    r"bypass policy",
    r"change policy",
    r"ignore policy rules",
    r"override authorization"
]

def check_prompt_injection(text: str) -> Tuple[bool, str]:
    lower_text = text.lower()
    for pattern in PROMPT_INJECTION_PATTERNS:
        if re.search(pattern, lower_text):
            return True, f"Prompt injection pattern detected: '{pattern}'"
    return False, ""

def filter_system_output(recommendation: str, reason: str) -> Tuple[str, str]:
    # Disallow definitive medical claim guarantees
    sanitized_reason = reason
    forbidden_claims = ["admission officially approved", "guaranteed payment", "binding authorization"]
    for phrase in forbidden_claims:
        if phrase in sanitized_reason.lower():
            sanitized_reason = re.sub(phrase, "Coverage recommendation generated", sanitized_reason, flags=re.IGNORECASE)

    # Ensure standardized recommendation code
    valid_recs = ["APPROVE-RECOMMENDED", "QUERY-TO-HOSPITAL", "MEDICAL-REVIEW", "REJECTED-NOT-COVERED"]
    clean_rec = recommendation if recommendation in valid_recs else "MEDICAL-REVIEW"

    return clean_rec, sanitized_reason
