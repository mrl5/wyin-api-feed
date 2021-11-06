export interface ValidateErrorJson {
    message: 'Validation failed';
    details: { [name: string]: unknown };
}

export interface BadRequestJson {
    message: 'Bad Request';
    details?: string;
}
