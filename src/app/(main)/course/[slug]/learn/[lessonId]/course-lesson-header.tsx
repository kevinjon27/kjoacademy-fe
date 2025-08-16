import Link from "next/link";
import Image from "next/image";

export type Props = {
  course: {
    title: string;
    slug: string;
  };
};

export default function CourseLessonHeader({ course }: Props) {
  return (
    <header className="w-full border-b border-primary-700 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex flex-row items-center px-8 py-4 space-x-4">
        <Link href="/" className="flex items-center">
          <div className="w-[180px]">
            <Image
              src="/img/kjoacademy-logo.webp"
              alt="KJO Academy"
              width={967}
              height={166}
              priority
              decoding="async"
            />
          </div>
        </Link>
        <div className="w-[1px] h-[24px] bg-gray-500"></div>
        <div className="flex items-center">
          <Link href={`/course/${course.slug}`}>
            <p>{course.title}</p>
          </Link>
        </div>
      </div>
    </header>
  );
}
