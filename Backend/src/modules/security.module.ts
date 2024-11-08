import bcrypt from "bcrypt"

export const cryptPassword = async (password: string | Buffer): Promise<string> => {
    const salt = await bcrypt.genSalt(10);

    return await bcrypt.hash(password, salt);
}

export const comparePassword = async (plainPass: string | Buffer, hashword: string): Promise<Boolean> =>  {
    return await bcrypt.compare(plainPass, hashword);
}