import nodemailer from 'nodemailer';
import { config } from '../../config';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.mail.email,
        pass: config.mail.password,
    },
});
