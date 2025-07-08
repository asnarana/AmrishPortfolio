// this is the data for the blog articles
// it is an array of objects
// each object has a slug, title, date, content, tags, and related projects
// the slug is the url slug for the article
// the title is the title of the article
// the date is the date of the article
// the content is the content of the article
// the tags are the tags for the article
// the related projects are the projects related to the article
export const blogArticles = [
  {
    slug: "deploying-on-aws",
    title: "Deploying on AWS: My Experience",
    date: "2025-07-05",
    content: `
When I set out to turn my Power BI fermentation dashboards into a live web app, I figured AWS would be the easiest path: spin up a database, host a server, point a browser at it. **Haha—no.** Instead, I found myself knee-deep in security groups, VPC quirks, Docker contexts and "public accessibility" toggles. In this post I'll walk you through each service I chose, the exact roadblocks I hit, and what those battles taught me.

## 1. Why I Picked AWS Free Tier
I'm studying for the AWS Cloud Practioner cert, so I wanted genuine, hands-on experience with real infrastructure. AWS Free Tier gives you:

- 750 hours/month of t2.micro EC2
- 750 hours/month of db.t3.micro RDS (PostgreSQL)
- 500 MB of ECR
- Some S3 and Lambda credits

All without billing—if you stay inside the limits. Perfect for a student side-project.

## 2. Service Choices & Their Roles

### Amazon RDS (PostgreSQL)
I needed a managed database for my 19–21 batch runs of fermentation data, plus all the Prophet forecasts. RDS saved me from configuring Postgres on my own VM, handling backups, minor version upgrades, and monitoring out of the box.

### Amazon EC2 (t2.micro)
My Dash app (built with Plotly Dash and Flask) needed a host. A t2.micro is enough to serve light traffic and gives me a sandbox to learn instance types, SSH, user data and IAM roles.

### Amazon ECR
Rather than Docker Hub, I pushed my \`ferment-app:latest\` into ECR—a private container registry tightly integrated with IAM. That let me practice least-privilege IAM policies, and ensured my credentials never hit a public registry.

### Amazon S3 (Future)
Although I hacked a local "fermentation" folder on EC2 for CSV and PNG storage, my next step is to offload those into S3 buckets. Lifecycle rules can archive old CSVs, and static website hosting could serve Power BI snapshots directly.

## 3. Deep-Dive: Networking & Security

### 3.1 EC2 Security Groups
**Symptom:** SSH always timed out—no matter what I tried:

\`\`\`bash
ssh -i ferm-key.pem ec2-user@ec2-54-12-34-56.compute-1.amazonaws.com
# → Connection timed out
\`\`\`

**Root cause:** AWS defaulted the SSH rule's "Source" to my previous IP—my ISP assignment changed overnight.

**Fix:**
- Hit whatismyip.com
- Update the EC2 Security Group inbound rule to \`YOUR.CURRENT.IP/32\` on port 22
- Immediately SSH connected

**Pro Tip:** Always verify both inbound and outbound rules; outbound defaults can bite you if you lock them down.

### 3.2 RDS Security Groups & Public Access
Connecting \`psql\` was my next blocker:

\`\`\`bash
psql --host=ferment-db.xxx.rds.amazonaws.com --port=5432 …  
# → Connection timed out
\`\`\`

RDS lives inside its own VPC SG. I needed to:
- Enable "Publicly accessible" when modifying the DB instance
- Open inbound TCP 5432 in that VPC security group for my IP
- Only then could my local client reach the database.

## 4. Docker on EC2 & ECR Integration
After building locally, I:

\`\`\`bash
aws ecr get-login-password --region us-east-1 \\
  | docker login --username AWS --password-stdin 123456789012.dkr.ecr...
docker tag ferment-app:latest 1234...amazonaws.com/ferm/ferment-app:latest
docker push 1234...amazonaws.com/ferm/ferment-app:latest
\`\`\`

**Pitfall:** On EC2, every docker command complained about \`/var/run/docker.sock permission denied\`.

**Solution:**

\`\`\`bash
sudo usermod -aG docker ec2-user
# then logout/login
docker ps  # now works
\`\`\`

Finally, I could:

\`\`\`bash
docker pull 1234.../ferm/ferment-app:latest
docker run -d -p 8050:8050 --env-file .env --name ferment-app ...
\`\`\`

## 5. The "Local S3" Hack
I ran into GitHub auth errors pushing code, so I cloned my repo directly into \`/home/ec2-user/fermentation\`. That folder became my "S3 bucket inside EC2," housing CSV exports and Power BI snapshots. It bypassed Docker context issues—because Docker only sees files in the build directory—but was obviously temporary. **Lesson:** understand build context before hacking workarounds.

## 6. Forecasting with Prophet
I built two scripts:
- \`forecast_bar_tables.py\` for annual/monthly aggregates
- \`forecast_timeseries.py\` for hourly batch data

Both read from RDS, fit a Prophet model (yearly or daily seasonality), forecast 5–24 periods ahead, and write results back to \`<kpi>_forecast\` tables. Seeing forecasts appear in RDS confirmed the end-to-end flow.

## 7. What I Loved—and the Frustrations
**Loved:**
- Managed services speed: RDS in two clicks, ECR in seconds.
- Integrated security: IAM, security groups, ECR auth—once mastered, it's powerful.
- Free Tier: zero-cost playground.

**Frustrated by:**
- Networking complexity: VPC, subnets, SGs, NACLs—felt like learning TCP/IP all over again.
- Context path failures: one misplaced \`.\` and Docker build can't see your app.
- IAM paranoia: crafting least-privilege policies vs. "just give me admin rights."

## 8. Next Adventures
- **S3 & Lifecycle:** Move CSV/PNG storage to real buckets, set auto-archive policies.
- **Lambda + EventBridge:** Automatically trigger forecasts when new CSVs land in S3.
- **Fargate / ECS:** Go serverless and avoid EC2 maintenance.
- **CloudWatch + Alerts:** Monitor app health, auto-restart on failures, and get Slack alerts for pipeline errors.

---

### Final Thoughts
AWS is both exhilarating and daunting—like exploring a vast theme park with hidden switchbacks. Every "why won't this connect, it worked lastnight?" moment was a chance to learn real cloud fundamentals. If you're embarking on your own AWS project, keep detailed notes, embrace the head-slaps, and remember: the cloud isn't magic… it just takes practice. I will continue to learn and update this post as I go.
`,
    tags: ["aws", "deployment", "docker", "python"],
    relatedProjects: [2],
  },
  {
    slug: "voice-ai-journey",
    title: "Building Voice Assistants & Benchmarking ASR: My Journey",
    date: "2025-07-08",
    content: `## Introduction

Building voice-enabled applications and fine-tuning state-of-the-art ASR (Automatic Speech Recognition) models has been an exhilarating journey through layers of audio engineering, machine learning, and real-world system integration. In this in-depth blog post, I'll share the story of two intertwined projects:

- **"Friend"**: A Python-based, wake-word-activated voice assistant that listens, reasons, and responds using libraries like \`speech_recognition\`, \`pyttsx3\`, Wikipedia/WolframAlpha integrations, and system calls.
- **ASRModels Benchmark & Fine-Tuning Suite**: A comprehensive framework that benchmarks Whisper, Wav2Vec2, Vosk, and Google STT on English and Tamil audio; evaluates metrics like WER; translates Tamil to English/Hindi; and fine-tunes Whisper for low-resource languages like Tamil and Sourashtra.

Beyond code snippets and performance numbers, this post dives into the design decisions, the unexpected roadblocks, the human stories behind the bugs, and the exciting horizons of voice AI.

---

## Why Voice? Why ASR?

Voice continues to be the most natural interface for human communication. From smart speakers to in-car assistants, the promise of interacting with machines as effortlessly as we talk to friends drives endless innovation:

- **Accessibility**: Voice UIs lower barriers for users with visual impairments or limited mobility.
- **Hands-free convenience**: Whether cooking or driving, speaking is often faster and safer than typing.
- **Expressiveness**: Tone, pause, and inflection carry meaning that text alone can't.

However, reliable voice applications demand robust ASR under noisy conditions, varied accents, and across languages—especially for communities whose mother tongues lack large public datasets. My two projects tackle both ends of this spectrum: crafting a user-friendly assistant, and building data-driven pipelines to benchmark and adapt ASR models.

---

## Project Spotlight: "Friend" Python Voice Assistant

### Core Features

- **Wake-word Detection**: Monitors microphone input and triggers on the word "friend".
- **Speech Recognition**: Captures live audio via \`speech_recognition\` (Google Web Speech API fallback).
- **Natural Responses**: Uses \`pyttsx3\` for offline text-to-speech, customizing voice rate and volume for natural pacing.
- **Knowledge Integration**:
  - Wikipedia module to fetch article summaries.
  - WolframAlpha for computational queries (e.g., "friend compute 37 factorial").
- **Task Automation**: Launches websites (e.g., "friend go to reddit.com") and records timestamped voice notes saved as \`note_YYYY-MM-DD-HH-MM-SS.txt\`.

### Behind the Scenes

#### Audio Pipelining

Converted raw PCM streams into chunks, applied noise suppression heuristics, and buffered for real-time transcription.

#### Error Handling

Gracefully handles \`speech_recognition.UnknownValueError\` by prompting the user ("I didn't catch that—can you repeat?").

Retries API calls up to three times before falling back to local TTS help ("Let me know if you need anything else.").

#### User Experience Tweaks

- Shortened TTS pauses between sentences by adjusting \`pyttsx3\` \`engine.setProperty('rate', 150)\`.
- Added confirmation prompts for critical actions ("Opening YouTube—proceed?").

---

## Project Spotlight: ASRModels Benchmark & Fine-Tuning

### Architecture & Workflow

#### Data Preparation

- **English & Tamil Clips**: Curated from Mozilla Common Voice and custom recordings; converted all .mp3 to mono 16 kHz WAV using \`pydub\` and \`soundfile\`.
- **Parallel Corpora**: Created \`validated.tsv\` (path + Tamil sentence), then auto-translated to English and Hindi via \`deep_translator\` and \`googletrans\`.
- **Dataset CSV**: Built \`tamil_asr_dataset.csv\` with columns \`audio\`, \`transcript_Tamil\`, \`transcript_English\`, \`transcript_Hindi\`.

#### Benchmarking Pipelines

- **Whisper** "base" and "small" via Hugging Face \`pipeline("automatic-speech-recognition")\`.
- **Wav2Vec2** (\`facebook/wav2vec2-base-960h\`) with PyTorch inference and transformers tokenizer.
- **Vosk** offline recognizer, streaming chunks through \`KaldiRecognizer\`.
- **Google Cloud STT** using \`google-cloud-speech\` client with LINEAR16 config.

#### Metrics & Evaluation

- **Word Error Rate (WER)** via \`jiwer\` and \`evaluate.load("wer")\`.
- **BLEU Score** for Tamil→English translations to gauge phrase-level fidelity.

#### Fine-Tuning Whisper

- Cast dataset into Hugging Face Dataset with Audio feature, resampled to 16 kHz.
- Split 70/30 train/test, then applied a custom \`prepare_dataset\` that extracts log-Mel spectrograms via \`WhisperFeatureExtractor\` and tokenizes via \`WhisperTokenizer\`.
- Configured \`Seq2SeqTrainingArguments\` (10 epochs, batch size 2, learning rate 5e-5) and trained with a \`Seq2SeqTrainer\`, tracking WER on validation.

---

## Key Insights

### Model Trade-offs

- Whisper "base" had ~5% WER on clear English, but took ~50 s per clip on CPU.
- Wav2Vec2 delivered ~33% WER in ~18 s, and Google STT gave ~23% WER in ~9 s—underscoring the engineering vs. research trade-off between cloud APIs and offline models.

### Low-Resource Language Challenges

- Fine-tuning on just a few dozen Tamil clips sometimes increased WER, revealing that small datasets can misguide large pre-trained models without augmentation.
- Parallel data collection (English/Hindi/Tamil) paved the way for both ASR and MT (machine translation) pipelines, illustrating the value of multi-task corpora.

---

## Overcoming the Roadblocks

### Dependency Conflicts

Two different whisper packages in the same environment led to mysterious AttributeErrors. The fix: isolate each notebook in its own Conda or virtualenv, and always pin versions (e.g., \`transformers==4.28.0\`, \`openai-whisper==20230606\`). This caused me from intially using Whisper AI to using the Whisper provided by the Hugging Face API.

### SUPD and PDOS in Responses

One of the trickiest challenges was correctly understanding how SUPD (Start of Utterance/Prompt Detection) and PDOS (Prompt Detection Output Structure) work in the model responses, and then parsing them accurately. Initially, I misinterpreted the structure of the returned objects, which led to incorrect segmentation and alignment of the transcribed text. After carefully reading the documentation and experimenting with different response payloads, I learned to extract the relevant fields and handle edge cases, such as overlapping prompts or missing SUPD/PDOS markers. This improved the reliability of my downstream processing and evaluation scripts.

### Audio Format Woes

Discovered that some .wav files were actually 24-bit or stereo. I wrote a validation function to inspect wave headers and auto-convert any non-16 kHz/mono files before processing.

### Metric Interpretation

A 1.08 WER on Tamil→Tamil transcription sounded bad, but manual inspection showed the model still captured key words. I supplemented WER with BLEU and qualitative error analyses (confusion matrices of substituted phonemes).

---

## What's Next? The Voice AI Horizon

- **On-Device Whisper** via ONNX or TFLite for real-time, offline transcription on mobile and edge devices.
- **Federated Fine-Tuning** to personalize ASR to my own voice or my Sourashtra-speaking community without sharing raw audio.
- **Multimodal Agents** using LangChain, hooking LLMs to ASR/TTS, vector databases (pinecone or FAISS), and live tool invocation ("Friend, book me a ride from my last location to the nearest coffee shop").
- **Explainable ASR Dashboards**: Visualizing confidence scores per word, phoneme-level attention heatmaps, and interactive correction loops so users can "teach" the model on the fly.

---

## Emerging Tools on My Radar

- **TinyML + Edge Impulse**: Run wake-word detection and keyword spotting on microcontrollers for always-on listening.
- **NVIDIA NeMo / SpeechBrain**: Turnkey toolkits for building, fine-tuning, and deploying ASR/TTS with advanced recipes.
- **Whisper JAX & Flax**: Accelerated training/inference on TPUs, slashing experiment times from hours to minutes.
- **RLHF for Dialogue**: Use human feedback loops to refine conversational tone, reduce hallucinations, and align with user preferences.
- **Retrieval-Augmented Generation**: Combine RAG with voice to answer domain-specific queries by pulling from embedded knowledge bases in real time.
---

## Conclusion

Bringing "Friend" to life and benchmarking/fine-tuning ASR models has been a roller coaster of audio-format puzzles, secret-management headaches, metric surprises, and glorious "it works!" moments. By weaving together end-user voice experiences with rigorous ML experimentation, I've gained a holistic view of what it takes to ship reliable, multi-lingual voice applications.

Ultimately, the frontier of voice AI isn't just about squeezing out a lower WER or a fancier demo—it's about building systems that earn user trust, respect privacy, and adapt gracefully to diverse voices and use cases. As I dive into on-device Whisper, federated personalization, and multi-modal agents, I'm more excited than ever for the conversations yet to come—both human and machine.
`,
    tags: ["voice-ai", "asr", "benchmarking", "python"],
    relatedProjects: [3],
  }
];