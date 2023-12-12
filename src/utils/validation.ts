import { plainToInstance } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
export * from 'class-validator';

export const validationPipe = async (
    schema: new () => object,
    requestObject: object,
): Promise<{ status: boolean; errors?: ValidationError[] }> => {
    const transformedClass = plainToInstance(schema, requestObject);
    const errors = await validate(transformedClass);
    if (errors.length > 0) {
        return { status: false, errors };
    }
    return { status: true };
};
