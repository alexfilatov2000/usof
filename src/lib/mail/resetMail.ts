import { User } from '../../entity/user';
import { config } from '../../config';

export const getPasswordResetURL = (token: string): string => {
    return `${config.url}/password-reset/${token}`;
};

export const resetPasswordTemplate = (user: User, url: string): Record<'from' | 'to' | 'subject' | 'html', string> => {
    const from = 'tanyaarni@gmail.com';
    const to = user.email;
    const subject = '🥵Password Reset 🥵';
    const html = `
      <p>Hey ${user.full_name},</p>
      <p>We heard that you lost your URL-Minimization password. Sorry about that!</p>
      <p>But don’t worry! You can use the following link to reset your password:</p>
      <a href=${url}>${url}</a>
      <p>If you don’t use this link within 1 hour, it will expire.</p>
      <p>Do something outside today! </p>
    `;
    return { from, to, subject, html };
};
