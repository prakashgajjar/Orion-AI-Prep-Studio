/**
 * SETUP & IMPLEMENTATION GUIDE
 * Complete guide to finalize backend API integration
 */

# Complete Backend API Setup & Implementation Guide

## 📚 Table of Contents
1. [Environment Setup](#environment-setup)
2. [MongoDB Integration](#mongodb-integration)
3. [Testing APIs](#testing-apis)
4. [Deployment](#deployment)
5. [Troubleshooting](#troubleshooting)

---

## 🔧 Environment Setup

### 1. Required Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/orion-ai?retryWrites=true&w=majority

# Authentication (NextAuth)
NEXTAUTH_SECRET=your-super-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Stripe (for payments)
STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# Google Generative AI (for AI features)
GOOGLE_GENERATIVE_AI_KEY=your-google-ai-key

# Node Environment
NODE_ENV=development
```

### 2. Generate NEXTAUTH_SECRET

```bash
# Generate a secret for NEXTAUTH_SECRET
openssl rand -base64 32
```

### 3. Install Dependencies

```bash
npm install mongoose
# or
yarn add mongoose
```

---

## 🗄️ MongoDB Integration

### Step 1: Connect to MongoDB

MongoDB is already configured. The connection is handled by `/src/lib/db.js`:

```javascript
import { connectDB } from "@/lib/db";
```

### Step 2: Integrate Models in API Routes

Use this pattern for all API routes:

```javascript
// At the top of your API route file
import { connectDB } from "@/lib/db";
import { Assessment } from "@/models";
import { successResponse, errorResponse } from "@/utils/api/responseHandler";
import { getServerSession } from "next-auth/next";

export async function POST(req) {
  try {
    // 1. Connect to database
    await connectDB();

    // 2. Check authentication
    const session = await getServerSession();
    if (!session?.user) {
      return errorResponse("Unauthorized", 401);
    }

    // 3. Parse and validate input
    const body = await req.json();
    const errors = validateInput(body);
    if (Object.keys(errors).length) {
      return validationError(errors);
    }

    // 4. Create and save database record
    const document = new Assessment({
      userId: session.user.id,
      // ...other fields
    });
    const saved = await document.save();

    // 5. Return success response
    return successResponse(saved, "Created successfully", 201);
  } catch (error) {
    console.error("API Error:", error);
    return errorResponse("Server error", 500, error);
  }
}
```

### Step 3: Update All API Routes

Update these API files to use MongoDB:

#### Interview APIs
- [ ] `/src/app/api/interviews/start/route.js`
- [ ] `/src/app/api/interviews/get-question/route.js`
- [ ] `/src/app/api/interviews/submit-answer/route.js`
- [ ] `/src/app/api/interviews/end/route.js`

#### Test APIs
- [ ] `/src/app/api/tests/generate/route.js`
- [ ] `/src/app/api/tests/submit/route.js`

#### Assessment APIs
- [ ] `/src/app/api/assessments/code-review/route.js` (Update existing)
- [ ] `/src/app/api/assessments/technical-round/route.js`

#### AI Services APIs
- [ ] `/src/app/api/ai-services/concept-explainer/route.js`
- [ ] `/src/app/api/ai-services/answer-analysis/route.js`
- [ ] `/src/app/api/ai-services/question-generator/route.js`

#### Analytics APIs
- [ ] `/src/app/api/analytics/user-progress/route.js`
- [ ] `/src/app/api/analytics/report-generator/route.js`

#### Resource APIs
- [ ] `/src/app/api/resources/featured/route.js`
- [ ] `/src/app/api/resources/bookmark/route.js`
- [ ] `/src/app/api/resources/bookmarks/route.js`

---

## 🧪 Testing APIs

### Using Thunder Client (VS Code Extension)

1. Install "Thunder Client" extension
2. Create requests for each endpoint
3. Test with real data

### Using Postman

1. Install Postman
2. Import the API collection
3. Set up environment variables
4. Test each endpoint

### Using cURL

```bash
# Test interview start
curl -X POST http://localhost:3000/api/interviews/start \
  -H "Content-Type: application/json" \
  -d '{
    "jobTitle": "Senior Developer",
    "interviewType": "technical",
    "difficulty": "medium"
  }'

# Test test generation
curl -X POST http://localhost:3000/api/tests/generate \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "JavaScript",
    "topic": "Arrays",
    "difficulty": "medium",
    "numberOfQuestions": 5
  }'
```

### Frontend Testing

See `/src/examples/api-usage.example.js` for integration examples.

---

## 🚀 Deployment

### Vercel Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Complete backend API implementation"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Import your GitHub repository
   - Add environment variables
   - Deploy

3. **Configure Production Database**
   - Use MongoDB Atlas production cluster
   - Update `MONGODB_URI` in production environment

### Environment Variables for Production

Set in Vercel dashboard:
- MONGODB_URI (production)
- NEXTAUTH_SECRET
- GOOGLE_CLIENT_ID / SECRET
- STRIPE_PUBLIC_KEY / SECRET
- GOOGLE_GENERATIVE_AI_KEY

---

## 🆘 Troubleshooting

### MongoDB Connection Issues

**Error**: `MongooseError: Cannot connect to MongoDB`

**Solution**:
- Check MONGODB_URI is correct
- Allow your IP in MongoDB Atlas
- Verify database name in connection string

### API Returns 401 Unauthorized

**Reason**: User not authenticated

**Solution**:
- Check NextAuth configuration
- Verify NEXTAUTH_SECRET is set
- Check browser session/cookies

### CORS Issues

**Error**: `Access to XMLHttpRequest blocked by CORS`

**Solution**:
Add to `next.config.mjs`:
```javascript
const nextConfig = {
  headers: async () => {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
  },
};
```

### 502 Bad Gateway (Production)

**Solution**:
- Check MongoDB connection timeout
- Verify environment variables are set
- Check logs in Vercel dashboard
- Reduce response payload size

---

## 📋 Next Phase: AI Integration

### Google Generative AI Setup

1. Get API key from Google AI Studio
2. Add to environment: `GOOGLE_GENERATIVE_AI_KEY`

3. Example integration:

```javascript
import { GoogleGenerativeAI } from "@google/generai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const result = await model.generateContent("Your prompt here");
```

4. Update AI service endpoints to use real AI

---

## 🎯 API Checklist

### Before Going Live

- [ ] All 14 API endpoints created
- [ ] MongoDB connection working
- [ ] Authentication middleware protecting routes
- [ ] Error handling implemented
- [ ] Response format standardized
- [ ] Database models created and tested
- [ ] Frontend API client configured
- [ ] Environment variables set
- [ ] Logging and monitoring configured
- [ ] Rate limiting (optional) added

### After Deployment

- [ ] Test all endpoints in production
- [ ] Monitor error logs
- [ ] Check database size
- [ ] Verify authentication sessions
- [ ] Test payment processing (if applicable)
- [ ] Monitor API response times

---

## 📈 Performance Tips

1. **Add Indexes**
   ```javascript
   // In your models
   userSchema.index({ email: 1 });
   assessmentSchema.index({ userId: 1, createdAt: -1 });
   ```

2. **Cache Responses**
   ```javascript
   // Add Redis caching for frequently accessed data
   const cached = await redis.get(key);
   if (cached) return cached;
   ```

3. **Paginate Results**
   ```javascript
   // Use pagination for large data sets
   const page = req.query.page || 1;
   const limit = 10;
   const skip = (page - 1) * limit;
   const results = await Model.find().skip(skip).limit(limit);
   ```

4. **Use Database Projections**
   ```javascript
   // Only fetch needed fields
   const user = await User.findById(id).select("name email");
   ```

---

## 🔗 Useful Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Guide](https://mongoosejs.com/docs/guide.html)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google Generative AI](https://ai.google.dev/)

---

## 📞 Support

If you encounter issues:

1. Check the error message in console/logs
2. Review `/src/utils/api/responseHandler.js` for error handling
3. Check database connection in `/src/lib/db.js`
4. Review examples in `/src/examples/api-usage.example.js`
5. Check API documentation in `/src/configs/apiRoutes.js`

---

**Status**: ✅ Framework Complete - Ready for Implementation
**Next**: Implement MongoDB integration in all API routes
**Estimated Time**: 2-4 hours for complete integration
