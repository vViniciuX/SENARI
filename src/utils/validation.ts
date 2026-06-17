import { VALIDATION } from '@constants/validation';

export const validateEmail = (email: string): boolean => {
  return VALIDATION.EMAIL_REGEX.test(email);
};

export const validatePassword = (senha: string): {
  isValid: boolean;
  requirements: {
    minLength: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    special: boolean;
  };
} => {
  return {
    isValid:
      senha.length >= VALIDATION.PASSWORD_MIN_LENGTH &&
      VALIDATION.PASSWORD_REQUIREMENTS.uppercase.test(senha) &&
      VALIDATION.PASSWORD_REQUIREMENTS.lowercase.test(senha) &&
      VALIDATION.PASSWORD_REQUIREMENTS.number.test(senha) &&
      VALIDATION.PASSWORD_REQUIREMENTS.special.test(senha),
    requirements: {
      minLength: senha.length >= VALIDATION.PASSWORD_MIN_LENGTH,
      uppercase: VALIDATION.PASSWORD_REQUIREMENTS.uppercase.test(senha),
      lowercase: VALIDATION.PASSWORD_REQUIREMENTS.lowercase.test(senha),
      number: VALIDATION.PASSWORD_REQUIREMENTS.number.test(senha),
      special: VALIDATION.PASSWORD_REQUIREMENTS.special.test(senha),
    },
  };
};

export const validateNome = (nome: string): boolean => {
  return (
    nome.length >= VALIDATION.NOME_MIN_LENGTH &&
    nome.length <= VALIDATION.NOME_MAX_LENGTH &&
    /^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s]+$/.test(nome)
  );
};

export const validateDataNascimento = (data: string): boolean => {
  const date = new Date(data);
  const today = new Date();
  const age = today.getFullYear() - date.getFullYear();
  return age >= 13 && age <= 120 && date < today;
};

export const validatePasswordsMatch = (senha1: string, senha2: string): boolean => {
  return senha1 === senha2 && senha1.length > 0;
};

export const validateRequiredField = (value: any): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};
