import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import AnimatedSection from '../animations/AnimatedSection';

const VideoIntroduction: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const handlePlayToggle = () => {
    const video = document.getElementById('intro-video') as HTMLVideoElement;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
      setHasStarted(true);
    }
  };

  const handleMuteToggle = () => {
    const video = document.getElementById('intro-video') as HTMLVideoElement;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const videoScript = `
    I'm Jacob Darling, and I help marketing teams turn campaigns into measurable revenue growth.

    Over the past decade, I've built marketing automation systems delivering 40% conversion increases,
    70% efficiency gains across 30,000+ users.

    If you're looking to scale your marketing without scaling headcount,
    let's talk about how automation can drive your next phase of growth.
  `;

  return (
    <section className="video-introduction py-20 bg-gradient-to-br from-card to-card/30">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-text mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Meet Jacob: Marketing Technologist & Growth Catalyst
            </motion.h2>
            <motion.p
              className="text-lg text-muted max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              A 60-second introduction to how I transform marketing operations through automation,
              analytics, and strategic systems architecture
            </motion.p>
          </div>

          <motion.div
            className="video-container relative bg-black rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Video Element */}
            <video
              id="intro-video"
              className="w-full aspect-video object-cover"
              poster="/images/video/intro-video-poster.jpg"
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onLoadedMetadata={() => setHasStarted(true)}
            >
              <source src="/videos/jacob-intro-60sec.mp4" type="video/mp4" />
              <source src="/videos/jacob-intro-60sec.webm" type="video/webm" />
            </video>

            {/* Video Controls Overlay */}
            {hasStarted && (
              <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex items-center gap-4">
                  <motion.button
                    onClick={handlePlayToggle}
                    className="w-16 h-16 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-gray-800" />
                    ) : (
                      <Play className="w-8 h-8 text-gray-800 ml-1" />
                    )}
                  </motion.button>

                  <motion.button
                    onClick={handleMuteToggle}
                    className="w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isMuted ? (
                      <VolumeX className="w-6 h-6 text-gray-800" />
                    ) : (
                      <Volume2 className="w-6 h-6 text-gray-800" />
                    )}
                  </motion.button>
                </div>
              </div>
            )}

            {/* Video Duration Badge */}
            <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
              0:60
            </div>

            {/* Video Title Overlay */}
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg">
              <div className="font-semibold">Marketing ROI Through Automation</div>
              <div className="text-sm text-gray-300">Jacob Darling • 60 seconds</div>
            </div>
          </motion.div>

          {/* Video Script Text */}
          <motion.div
            className="mt-8 p-6 bg-card/50 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-text mb-4">Video Transcript</h3>
            <p className="text-muted leading-relaxed">
              {videoScript}
            </p>
          </motion.div>

          {/* Key Stats Highlight */}
          <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center p-6 bg-card/30 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">40%</div>
              <div className="text-muted">Conversion Increase</div>
            </div>
            <div className="text-center p-6 bg-card/30 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">70%</div>
              <div className="text-muted">Efficiency Gains</div>
            </div>
            <div className="text-center p-6 bg-card/30 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">30K+</div>
              <div className="text-muted">Users Served</div>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>

      <style>{`
        .video-introduction {
          position: relative;
        }

        .video-container {
          position: relative;
          background: linear-gradient(135deg, #000 0%, #1a1a1a 100%);
        }

        #intro-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .video-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg,
            rgba(59, 130, 246, 0.1) 0%,
            rgba(147, 51, 234, 0.1) 50%,
            rgba(236, 72, 153, 0.1) 100%);
          pointer-events: none;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .video-container {
            border-radius: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default VideoIntroduction;