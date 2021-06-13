import { User } from '../../entity/user';
import { config } from '../../config';

export const getVerifyURL = (token: string): string => {
    return `${config.url}/verify-email/${token}`;
};

export const verifyTemplate = (user: User, url: string): Record<'from' | 'to' | 'subject' | 'html', string> => {
    const from = 'tanyaarni@gmail.com';
    const to = user.email;
    const subject = 'Email Verification 🤩';
    const html = `
      <p>Hey ${user.full_name},</p>
      <p>You should go right there to verify your email ⬇⬇⬇</p>
      <a href=${url}>${url}</a>
    `;
    return { from, to, subject, html };
};
