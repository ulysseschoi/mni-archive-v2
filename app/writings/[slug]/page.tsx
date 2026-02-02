"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { notFound } from "next/navigation";

// Mock data
const mockWritings = [
  {
    _id: "1",
    slug: "thoughts-on-creativity",
    title: "Thoughts on Creativity",
    excerpt:
      "창의성에 대한 생각들. 완벽하지 않아도 괜찮다는 것, 혼돈 속에서도 아름다움을 찾을 수 있다는 것에 대하여.",
    content: `창의성은 완벽함이 아니라 용기에서 시작된다고 생각해요.

많은 사람들이 창작을 시작하지 못하는 이유는 '완벽하게 해야 한다'는 부담감 때문이에요. 하지만 제가 깨달은 건, 가장 아름다운 작품들은 대부분 불완전함 속에서 탄생했다는 거예요.

혼돈스러운 스케치, 엉망인 첫 녹음, 지저분한 초안들. 이 모든 것들이 결국 하나의 작품으로 완성되어 가는 과정이죠.

완벽을 추구하기보다는, 지금 이 순간의 감정을 솔직하게 표현하는 게 더 중요하다고 생각해요. 그게 바로 진정한 창의성이 아닐까요?

So, just start. Create. Make mistakes. And find beauty in the chaos.`,
    publishedAt: "2026-01-28",
    category: "essay",
    readTime: "5 min read",
  },
  {
    _id: "2",
    slug: "midnight-poetry",
    title: "Midnight Poetry",
    excerpt:
      "한밤중에 쓴 시. 달빛 아래서 펼쳐지는 생각의 조각들을 모았습니다.",
    content: `In the quiet of the night
Where shadows dance with light
I find my thoughts take flight
Beyond the reach of sight

한밤의 고요 속에서
그림자가 빛과 춤추는 곳
내 생각은 날아오르네
시야를 벗어나

The moon whispers secrets old
Of stories left untold
In silver light so bold
My heart begins to unfold

달이 속삭이는 오래된 비밀
아직 말하지 못한 이야기들
대담한 은빛 속에서
내 마음이 펼쳐지기 시작해

Between the dark and dawn
Where all my fears are gone
I write until the morning yawn
And find myself reborn

어둠과 새벽 사이
모든 두려움이 사라진 곳
아침의 하품이 올 때까지 쓰네
그리고 다시 태어난 나를 발견해`,
    publishedAt: "2026-01-25",
    category: "poetry",
    readTime: "3 min read",
  },
  {
    _id: "3",
    slug: "my-creative-journey",
    title: "My Creative Journey",
    excerpt:
      "음악과 그림, 그리고 글쓰기를 통해 나를 표현하기까지의 여정을 돌아봅니다.",
    content: `Every artist has a journey. Mine started with a simple doodle on the corner of a notebook...`,
    publishedAt: "2026-01-20",
    category: "personal",
    readTime: "8 min read",
  },
];

export default function WritingDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const writing = mockWritings.find((w) => w.slug === params.slug);

  if (!writing) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Back Button */}
      <motion.div
        initial={mounted ? { opacity: 0, y: -20 } : {}}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="border-b border-white/10 px-6 py-6 md:px-12"
      >
        <Link
          href="/writings"
          className="group inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
        >
          <motion.span
            className="transition-transform group-hover:-translate-x-1"
            whileHover={{ x: -4 }}
          >
            ←
          </motion.span>
          BACK TO WRITINGS
        </Link>
      </motion.div>

      {/* Article Content */}
      <article className="mx-auto max-w-3xl px-6 py-12 md:px-12 md:py-16">
        {/* Header */}
        <motion.header
          initial={mounted ? { opacity: 0, y: 20 } : {}}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 space-y-6"
        >
          {/* Category Badge */}
          <div>
            <span className="inline-block rounded-full border border-white/30 px-4 py-1.5 text-xs uppercase tracking-wider">
              {writing.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-light leading-tight tracking-wide md:text-5xl">
            {writing.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-white/50">
            <time>
              {new Date(writing.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>·</span>
            <span>{writing.readTime}</span>
          </div>

          {/* Excerpt */}
          {writing.excerpt && (
            <p className="text-lg leading-relaxed text-white/70">
              {writing.excerpt}
            </p>
          )}
        </motion.header>

        {/* Divider */}
        <motion.div
          initial={mounted ? { scaleX: 0 } : {}}
          animate={mounted ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 h-px origin-left bg-gradient-to-r from-white/20 to-transparent"
        />

        {/* Content */}
        <motion.div
          initial={mounted ? { opacity: 0, y: 20 } : {}}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          <div className="space-y-6 whitespace-pre-wrap leading-relaxed text-white/90">
            {writing.content}
          </div>
        </motion.div>

        {/* End Mark */}
        <motion.div
          initial={mounted ? { opacity: 0 } : {}}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center text-2xl text-white/30"
        >
          ✦
        </motion.div>
      </article>

      {/* Footer */}
      <motion.footer
        initial={mounted ? { opacity: 0 } : {}}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="border-t border-white/10 px-6 py-8 text-center text-sm text-white/50"
      >
        <p>© 2026 MNI Archive. All rights reserved.</p>
      </motion.footer>
    </main>
  );
}
