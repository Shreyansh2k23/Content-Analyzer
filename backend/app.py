import os
import io
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
import google.generativeai as genai
import PyPDF2
import pytesseract
from PIL import Image
import tempfile
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
from markupsafe import Markup
import markdown
# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configuration
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024  # 10MB max file size
UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg'}

# Create upload folder if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Configure Gemini AI
# print(os.getenv.GEMINI_API_KEY)
api_key = os.getenv('GEMINI_API_KEY')
if api_key:
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-2.0-flash")
else:
    print("Warning: GEMINI_API_KEY not found in environment variables")
    model = None


def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_text_from_pdf(file_stream):
    """Extract text from PDF file"""
    try:
        pdf_reader = PyPDF2.PdfReader(file_stream)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text() + "\n"
        return text.strip()
    except Exception as e:
        print(f"Error extracting text from PDF: {str(e)}")
        return None

def extract_text_from_image(file_stream):
    """Extract text from image using OCR"""
    try:
        # Open image
        image = Image.open(file_stream)
        
        # Convert to RGB if necessary
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Extract text using pytesseract
        text = pytesseract.image_to_string(image)
        return text.strip()
    except Exception as e:
        print(f"Error extracting text from image: {str(e)}")
        return None

def analyze_content_with_gemini(text):
    """Analyze content using Gemini AI"""
    if not model or not text.strip():
        return None, None
    
    try:
        # Analysis prompt
        analysis_prompt = f"""
        Analyze this text content for social media potential. Provide insights on:
        
        1. Content Type: What type of content is this?
        2. Tone & Sentiment: What's the overall tone?
        3. Engagement Potential: Rate the engagement potential (1-10)
        4. Target Audience: Who would be interested in this?
        5. Key Themes: What are the main topics/themes?
        6. Readability: How easy is it to read and understand?
        7. Strengths: What are the strong points of this content?
        8. Weaknesses: What could be improved?
        9. Unique Elements: Any unique or standout features?
        10. hashtag Relevance: Suggest relevant hashtags
        11 searchability: How well would this perform in search?        
        Text to analyze:
        {text[:2000]}  
        
        Provide a structured analysis in a clear, readable format.
        """
        
        analysis_response = model.generate_content(analysis_prompt)
        analysis = analysis_response.text
        analysis = Markup(markdown.markdown(analysis))
        
        # Recommendations prompt
        recommendations_prompt = f"""
        Based on this content, provide specific social media recommendations:
        
        Content: {text[:1500]}
        
        Please provide:
        1. Platform Recommendations: Which social media platforms would work best?
        2. Content Improvements: How to make it more engaging?
        3. Hashtag Suggestions: Relevant hashtags to use
        4. Posting Strategy: Best times and frequency to post
        5. Call-to-Action Ideas: How to encourage audience interaction
        6. Visual Suggestions: What images/videos would complement this content?
        
        Make recommendations specific and actionable.
        """
        
        recommendations_response = model.generate_content(recommendations_prompt)
        recommendations = recommendations_response.text
        recommendations = Markup(markdown.markdown(recommendations))
        
        return analysis, recommendations
        
    except Exception as e:
        print(f"Error analyzing content with Gemini: {str(e)}")
        return None, None

@app.route('/')
def index():
    """Serve the main page"""
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    """Handle file upload and analysis"""
    try:
        # Check if file is present
        if 'file' not in request.files:
            return jsonify({
                'success': False,
                'error': 'No file uploaded'
            }), 400
        
        file = request.files['file']
        
        # Check if file is selected
        if file.filename == '':
            return jsonify({
                'success': False,
                'error': 'No file selected'
            }), 400
        
        # Check if file is allowed
        if not allowed_file(file.filename):
            return jsonify({
                'success': False,
                'error': 'File type not allowed. Please upload PDF or image files.'
            }), 400
        
        # Read file content
        file_content = file.read()
        file.seek(0)  # Reset file pointer
        
        # Extract text based on file type
        filename = secure_filename(file.filename)
        file_extension = filename.rsplit('.', 1)[1].lower()
        
        extracted_text = ""
        
        if file_extension == 'pdf':
            # Extract text from PDF
            file_stream = io.BytesIO(file_content)
            extracted_text = extract_text_from_pdf(file_stream)
        
        elif file_extension in ['png', 'jpg', 'jpeg']:
            # Extract text from image using OCR
            file_stream = io.BytesIO(file_content)
            extracted_text = extract_text_from_image(file_stream)
        
        # Check if text was extracted
        if not extracted_text or len(extracted_text.strip()) < 10:
            return jsonify({
                'success': False,
                'error': 'Could not extract readable text from the file. Please try a different file with clear text.'
            }), 400
        
        # Analyze content with Gemini AI
        analysis, recommendations = analyze_content_with_gemini(extracted_text)
        
        # Prepare response
        response_data = {
            'extracted_text': extracted_text,
            'analysis': analysis or 'Analysis not available at the moment.',
            'recommendations': recommendations or 'Recommendations not available at the moment.'
        }
        
        return jsonify({
            'success': True,
            'data': response_data
        })
    
    except Exception as e:
        print(f"Error in analyze route: {str(e)}")
        return jsonify({
            'success': False,
            'error': f'An error occurred during analysis: {str(e)}'
        }), 500

@app.route('/health')
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'gemini_configured': model is not None
    })

if __name__ == '__main__':
    print("Starting Social Media Content Analyzer...")
    print(f"Gemini AI configured: {model is not None}")
    app.run(debug=True, host='0.0.0.0', port=5000)