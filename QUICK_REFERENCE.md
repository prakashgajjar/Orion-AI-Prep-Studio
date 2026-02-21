/**
 * QUICK REFERENCE CARD
 * Fast lookup for API endpoints and usage
 */

# 🚀 Quick API Reference Card

## 📍 Base URL
```
http://localhost:3000/api
```

---

## 🎯 Endpoint Quick Map

### Interviews
```
POST   /interviews/start              → Start interview
POST   /interviews/get-question       → Get question
POST   /interviews/submit-answer      → Submit answer
POST   /interviews/end                → End & report
```

### Tests
```
POST   /tests/generate                → Create test
POST   /tests/submit                  → Submit test
```

### Assessments
```
POST   /assessments/code-review       → Code review
POST   /assessments/technical-round   → Tech round
```

### AI Services
```
POST   /ai-services/concept-explainer → Explain concept
POST   /ai-services/answer-analysis   → Analyze answer
POST   /ai-services/question-generator → Generate questions
```

### Analytics
```
GET    /analytics/user-progress       → Get analytics
POST   /analytics/report-generator    → Generate report
```

### Resources
```
GET    /resources/featured            → Featured resources
GET    /resources/bookmarks           → Get bookmarks
POST   /resources/bookmark            → Save bookmark
```

---

## 🔐 Authentication
All endpoints require NextAuth session. Headers are automatic.

---

## 📦 Response Format
```javascript
{
  success: true,
  statusCode: 200,
  message: "...",
  data: { /* your data */ },
  timestamp: "2024-03-15T..."
}
```

---

## 🎨 Frontend Usage
```javascript
import { api } from '@/services/api';

// Start interview
await api.interviews.start({
  jobTitle: "Senior Dev",
  interviewType: "technical",
  difficulty: "medium"
});

// Generate test
await api.tests.generate({
  subject: "JavaScript",
  topic: "Async",
  difficulty: "medium",
  numberOfQuestions: 10
});

// Get analytics
await api.analytics.getUserProgress();
```

---

## 📚 With Custom Hooks
```javascript
import { useApi } from '@/hooks/useApi';

const { call, loading, error } = useApi();
const result = await call(api.tests.generate, data);
```

---

## 🎯 Common Status Codes
| Code | Meaning |
|------|---------|
| 200  | Success |
| 201  | Created |
| 400  | Bad Request |
| 401  | Unauthorized |
| 500  | Server Error |

---

## 📁 Key Files
- API Client: `/src/services/api.js`
- Hooks: `/src/hooks/useApi.js`
- Models: `/src/models/index.js`
- Utils: `/src/utils/api/responseHandler.js`
- DB: `/src/lib/db.js`
- Examples: `/src/examples/api-usage.example.js`

---

## 🔧 Testing
```bash
# Test an endpoint
curl -X POST http://localhost:3000/api/tests/generate \
  -H "Content-Type: application/json" \
  -d '{"subject":"JS","topic":"Arrays","difficulty":"easy","numberOfQuestions":5}'
```

---

## ⚡ Pro Tips
1. **Always check** `response.success` before using data
2. **Handle errors** with try-catch blocks
3. **Use loading states** during API calls
4. **Check examples** in `/src/examples/api-usage.example.js`
5. **Read docs** in `/src/configs/apiRoutes.js`

---

## ✅ Checklist for Implementation

- [x] 14 API endpoints created
- [x] Response handler utilities
- [x] Auth middleware
- [x] Frontend API client
- [x] Custom hooks
- [x] MongoDB models
- [x] Database connection helper
- [ ] Connect APIs to MongoDB
- [ ] Integrate Google Generative AI
- [ ] Add rate limiting
- [ ] Add email notifications
- [ ] Add PDF generation
- [ ] Add file upload
- [ ] Add WebSocket for real-time

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| 401 Error | Check authentication, verify session |
| 400 Error | Check request payload, validate input |
| 500 Error | Check server logs, verify DB connection |
| Slow Response | Add indexes, implement caching |
| CORS Error | Check CORS middleware configuration |

---

## 📞 Need Help?
1. Check logs: `npm run dev` output
2. Check examples: `/src/examples/`
3. Check docs: `/src/configs/apiRoutes.js`
4. Read setup guide: `SETUP_GUIDE.md`
5. Review summary: `BACKEND_API_SUMMARY.md`

---

**Version**: 1.0 | **Last Updated**: March 2024 | **Status**: ✅ Ready
