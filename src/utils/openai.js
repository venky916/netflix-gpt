// import OpenAI from 'openai';
// import { OPENAI_KEY } from '../utils/constants';

// const openai = new OpenAI({
//     apiKey: OPENAI_KEY, // This is the default and can be omitted
//     dangerouslyAllowBrowser: true
// });

// export default openai;

import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_KEY } from '../utils/constants';

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);
export default genAI;


