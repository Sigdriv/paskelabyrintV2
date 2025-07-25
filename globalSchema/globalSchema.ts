import { isValidPhoneNumber } from '@utils';
import { z } from 'zod';

import { isNumeric, notUndefined } from './utils';

export function globalSchema() {
  const createStringSchema = (label: string, min: number, max: number) => {
    let stringSchema = z.string({ error: `${label} er påkrevd` });

    if (max === min) {
      stringSchema = stringSchema
        .min(1, { message: `${label} er påkrevd` })
        .length(max, {
          message: `${label} må være maks ${max} karakterer`,
        });
    } else {
      stringSchema = stringSchema.max(max, {
        message: `${label} kan ikke være mer enn ${max} karakterer`,
      });
    }

    if (max !== min && min > 0) {
      stringSchema = stringSchema.min(min, {
        message:
          min === 1
            ? `${label} er påkrevd`
            : `${label} må være minst ${min} karakterer`,
      });
    }

    return stringSchema;
  };

  const createEmailSchema = (label = 'Epost', max = 254, optional = false) => {
    if (optional) {
      return z.union([
        z.literal(''),
        z
          .string({ error: `${label} er påkrevd` })
          .max(max, { message: `${label} kan ikke være mer enn ${max} tegn` })
          .email({ message: `${label} er ugyldig` })
          .optional(),
      ]);
    }

    return z
      .string({ error: `${label} er påkrevd` })
      .min(1, `${label} er påkrevd`)
      .max(max, { message: `${label} kan ikke være mer enn ${max} tegn` })
      .email({ message: `${label} er ugyldig` });
  };

  const createPhoneNrSchema = (label = 'Telefonnummer', optional = false) => {
    return z
      .string({ error: `${label} er påkrevd` })
      .refine((value) => optional || !!value, {
        message: `${label} er påkrevd`,
      })
      .refine(
        (value) => (optional && !value ? true : isValidPhoneNumber(value)),
        { message: `${label} er ugyldig` }
      );
  };

  const createPasswordSchema = () => {
    return z
      .string()
      .min(8, 'Passord må være minst 8 tegn')
      .regex(/[a-z]/, 'Passord må inneholde små bokstaver')
      .regex(/[A-Z]/, 'Passord må inneholde store bokstaver')
      .regex(/\d/, 'Passord må inneholde tall')
      .regex(/[@$!%*?&]/, 'Passord må inneholde spesialtegn');
  };

  const createRepeatPasswordSchema = () => {
    return z
      .object({
        password: z.string(),
        confirmPassword: z.string(),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: 'Passordene er ikke like',
        path: ['confirmPassword'], // peker på feltet som skal vise feilen
      });
  };

  const createIntSchema = (label: string, min: number, max: number) => {
    const numberSchema = z
      .number({ error: `${label} er påkrevd` })
      .int({ message: `${label} må være et heltall` })
      .min(min, `${label} må være minst ${min}`)
      .max(max, `${label} kan ikke være mer enn ${max}`);

    const isInteger = (val: string): boolean => {
      const parsed = Number(val);

      return Number.isInteger(parsed);
    };

    const stringSchema = z
      .string({ error: `${label} er påkrevd` })
      .refine(isNumeric, {
        message: `${label} må være et gyldig tall`,
      })
      .refine((val) => !(val.includes('.') || val.includes(',')), {
        message: `${label} må være et heltall`,
      })
      .refine((val) => isInteger(val), {
        message: `${label} må være et heltall`,
      })
      .refine((val) => val.trim() !== '', {
        message: `${label} er påkrevd`,
      })
      .refine((val) => parseInt(val) >= min, {
        message: `${label} må være minst ${min}`,
      })
      .refine((val) => parseInt(val) <= max, {
        message: `${label} kan ikke være mer enn ${max}`,
      });

    return z
      .union([numberSchema, stringSchema])
      .optional()
      .refine(notUndefined, { message: `${label} er påkrevd` });
  };

  return {
    createStringSchema,
    createEmailSchema,
    createPhoneNrSchema,
    createPasswordSchema,
    createRepeatPasswordSchema,
    createIntSchema,
  };
}
