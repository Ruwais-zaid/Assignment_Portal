import vine from '@vinejs/vine'

export const AdminValidations = vine.object({
   name:vine.string().minLength(5).maxLength(100),
   email: vine.string().email(),
   password: vine
    .string()
    .minLength(8)
    .maxLength(32)
    .confirmed()
})