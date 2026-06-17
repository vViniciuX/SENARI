export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_REQUIREMENTS: {
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    number: /[0-9]/,
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
  },
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  NOME_MIN_LENGTH: 3,
  NOME_MAX_LENGTH: 50,
};

export const ERROR_MESSAGES = {
  EMAIL_INVALID: 'E-mail inválido',
  EMAIL_REQUIRED: 'E-mail é obrigatório',
  PASSWORD_REQUIRED: 'Senha é obrigatória',
  PASSWORD_TOO_SHORT: `Senha deve ter no mínimo ${VALIDATION.PASSWORD_MIN_LENGTH} caracteres`,
  PASSWORD_NO_UPPERCASE: 'Senha deve conter letras maiúsculas',
  PASSWORD_NO_LOWERCASE: 'Senha deve conter letras minúsculas',
  PASSWORD_NO_NUMBER: 'Senha deve conter números',
  PASSWORD_NO_SPECIAL: 'Senha deve conter caracteres especiais',
  PASSWORD_MISMATCH: 'As senhas não coincidem',
  NOME_REQUIRED: 'Nome é obrigatório',
  NOME_TOO_SHORT: `Nome deve ter no mínimo ${VALIDATION.NOME_MIN_LENGTH} caracteres`,
  NOME_TOO_LONG: `Nome pode ter no máximo ${VALIDATION.NOME_MAX_LENGTH} caracteres`,
  DATA_NASCIMENTO_REQUIRED: 'Data de nascimento é obrigatória',
  FIELD_REQUIRED: 'Este campo é obrigatório',
};

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login realizado com sucesso',
  CADASTRO_SUCCESS: 'Cadastro realizado com sucesso',
  PASSWORD_RESET_SUCCESS: 'Senha redefinida com sucesso',
  EMAIL_VERIFIED_SUCCESS: 'E-mail verificado com sucesso',
  PROFILE_UPDATED: 'Perfil atualizado com sucesso',
  MISSAO_CREATED: 'Missão criada com sucesso',
  MISSAO_UPDATED: 'Missão atualizada com sucesso',
  MISSAO_DELETED: 'Missão deletada com sucesso',
  EQUIPE_CREATED: 'Equipe criada com sucesso',
  EQUIPE_UPDATED: 'Equipe atualizada com sucesso',
  EQUIPE_DELETED: 'Equipe deletada com sucesso',
};

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
export const ALLOWED_VIDEO_FORMATS = ['mp4', 'mov', 'avi', 'webm'];
export const ALLOWED_DOCUMENT_FORMATS = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];

export const QR_CODE_EXPIRY_MINUTES = 30;
export const EMAIL_VERIFICATION_ATTEMPTS_MAX = 5;
export const EMAIL_VERIFICATION_EXPIRY_MINUTES = 24 * 60; // 24 hours

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
};
