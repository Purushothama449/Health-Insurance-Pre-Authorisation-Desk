from datetime import datetime
from app.models import PreAuthRequest, ValidationResult

ALLOWED_ROOM_CATEGORIES = ["General", "Twin Sharing", "Private", "Deluxe"]
ALLOWED_ADMISSION_TYPES = ["Planned Surgical", "Day Care", "Emergency", "Maternity"]

def parse_date(date_str: str) -> datetime:
    formats = ["%d-%m-%Y", "%Y-%m-%d", "%d/%m/%Y", "%Y/%m/%d"]
    for fmt in formats:
        try:
            return datetime.strptime(date_str.strip(), fmt)
        except ValueError:
            pass
    raise ValueError(f"Invalid date format: {date_str}. Expected DD-MM-YYYY or YYYY-MM-DD.")

def validate_preauth_request(req: PreAuthRequest) -> ValidationResult:
    # 1. Required field checks
    if not req.patient_id or not req.patient_id.strip():
        return ValidationResult(valid=False, field="patient_id", error="Patient ID is required.")
    if not req.hospital_name or not req.hospital_name.strip():
        return ValidationResult(valid=False, field="hospital_name", error="Hospital Name is required.")
    if not req.policy_number or not req.policy_number.strip():
        return ValidationResult(valid=False, field="policy_number", error="Policy Number is required.")
    if not req.procedure or not req.procedure.strip():
        return ValidationResult(valid=False, field="procedure", error="Procedure name is required.")

    # 2. Allowed category checks
    if req.room_category not in ALLOWED_ROOM_CATEGORIES:
        return ValidationResult(valid=False, field="room_category", error=f"Invalid Room Category '{req.room_category}'. Must be one of {ALLOWED_ROOM_CATEGORIES}.")
    
    if req.admission_type not in ALLOWED_ADMISSION_TYPES:
        return ValidationResult(valid=False, field="admission_type", error=f"Invalid Admission Type '{req.admission_type}'. Must be one of {ALLOWED_ADMISSION_TYPES}.")

    # 3. Date validation & cross-field check
    try:
        start_dt = parse_date(req.policy_start_date)
    except ValueError as e:
        return ValidationResult(valid=False, field="policy_start_date", error=str(e))

    try:
        adm_dt = parse_date(req.admission_date)
    except ValueError as e:
        return ValidationResult(valid=False, field="admission_date", error=str(e))

    if adm_dt < start_dt:
        return ValidationResult(
            valid=False,
            field="admission_date",
            error=f"Admission date ({req.admission_date}) cannot be before policy start date ({req.policy_start_date})."
        )

    return ValidationResult(valid=True)
