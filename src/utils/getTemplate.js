import fs from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);
export default async function getEmailTemplate(templatePath) {
  try {
    const template = await readFileAsync(templatePath, 'utf-8');
    return template;
  } catch (error) {
    console.error('Error reading email template:', error);
    return '';
  }
}