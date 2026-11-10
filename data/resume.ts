// Resume content reviewed in November 2026; CMS media and project details are preserved.
export const resumeProfile = {
  name: { th: 'อุทัยทิพย์ แสนศรี', en: 'AUTHAITIP SAENSRI' },
  headline: { th: 'นักพัฒนาเว็บไซต์ / Junior Full Stack Developer / System Analyst / Website Support', en: 'Web Developer | Junior Full Stack Developer | System Analyst | Website Support' },
  shortBio: {
    th: 'บัณฑิตวิทยาการคอมพิวเตอร์ มีประสบการณ์ฝึกงานรวม 5 เดือนในงาน Frontend Development และ Software Testing ครอบคลุมการพัฒนาหน้าเว็บด้วย React, Next.js และ TypeScript การเชื่อมต่อ API การทดสอบระบบ การแก้ไขปัญหา และการตรวจสอบ SEO กับประสิทธิภาพเว็บไซต์ พร้อมผลงาน Full Stack ที่ได้ออกแบบ User Flows ความสัมพันธ์ฐานข้อมูล และพัฒนา REST APIs',
    en: 'Computer Science graduate with five months of combined internship experience in frontend development and software testing. Hands-on experience building responsive interfaces with React, Next.js, and TypeScript, integrating APIs, investigating issues, and reviewing website SEO and performance. Full stack project experience includes user flow design, database relationships, and REST API development.',
  },
  fullBio: {
    th: 'ที่ SUNMI TH ได้พัฒนาส่วนสารบัญและคู่มือผู้ใช้ของ GPOS SPA รวมถึงระบบหลายภาษาและการเชื่อมต่อ Google Sheets API ของ GPOS BAR ส่วนที่ Software and Scale ได้ทดสอบเว็บและ REST APIs บันทึกข้อบกพร่อง และทำงานร่วมกับนักพัฒนาเพื่อตรวจสอบการแก้ไข\n\nนำมุมมองจากงานพัฒนาและงานทดสอบมาใช้ร่วมกัน โดยใส่ใจทั้งการทำงานของระบบและประสบการณ์ผู้ใช้ พร้อมต่อยอดสู่งาน Junior Full Stack Developer, System Analyst และ Website Support ผ่านทักษะวิเคราะห์ความต้องการ ออกแบบ User Flows และฐานข้อมูลจากโครงการ PawPlan',
    en: 'At SUNMI TH, contributed Table of Contents and User Manual sections for GPOS SPA, alongside multilingual support and Google Sheets API integration for GPOS BAR. At Software and Scale, tested web applications and REST APIs, documented defects, and collaborated with developers to verify fixes.\n\nCombines implementation experience with a testing mindset and attention to usability. Seeking Junior Full Stack Developer, System Analyst, or Website Support opportunities, supported by requirements analysis, user flow design, and database design experience from the PawPlan project.',
  },
}

export const education = {
  title: { th: 'การศึกษา', en: 'Education' },
  degree: { th: 'วิทยาศาสตรบัณฑิต สาขาวิทยาการคอมพิวเตอร์', en: 'Bachelor of Science in Computer Science' },
  university: { th: 'มหาวิทยาลัยรังสิต', en: 'Rangsit University' },
  period: '2022 – 2026',
  gpa: '3.00',
}

export const resumeExperiences = [
  {
    _id: 'resume-sunmi',
    jobTitle: { th: 'นักพัฒนา Frontend ฝึกงาน', en: 'Frontend Developer Intern' },
    company: { th: 'SUNMI TH', en: 'SUNMI TH' },
    startDate: '2026-04-08', endDate: '2026-08-14', isCurrent: false,
    durationMonths: 4,
    description: {
      th: 'พัฒนาและดูแลส่วนติดต่อผู้ใช้ด้วย Next.js, React และ TypeScript โดยปรับหน้าจอให้รองรับการใช้งานบนอุปกรณ์ขนาดต่าง ๆ\nนำข้อกำหนด UI/UX มาพัฒนาเป็นส่วนสารบัญและคู่มือผู้ใช้ของ GPOS SPA เพื่อจัดลำดับเนื้อหาและช่วยให้ผู้ใช้เข้าถึงข้อมูลการใช้งาน\nเพิ่มการรองรับหลายภาษาใน GPOS BAR เพื่อให้เนื้อหาและส่วนติดต่อผู้ใช้รองรับผู้ใช้งานต่างภาษา\nเชื่อมต่อ Google Sheets API เข้ากับ GPOS BAR เพื่อให้เว็บทำงานร่วมกับข้อมูลจากบริการภายนอก\nปรับปรุง On-page SEO และใช้ Google Lighthouse ตรวจสอบประสิทธิภาพเว็บไซต์เพื่อระบุจุดที่ควรปรับปรุง\nสืบค้นสาเหตุและแก้ไขปัญหา Frontend โดยคำนึงถึงความถูกต้องของการแสดงผล ความสะดวกในการใช้งาน และคุณภาพเว็บไซต์',
      en: 'Developed and maintained responsive web interfaces using Next.js, React, and TypeScript, adapting layouts for different screen sizes.\nTranslated UI/UX requirements into Table of Contents and User Manual sections for GPOS SPA, organizing product guidance to help users navigate information.\nImplemented multilingual support for GPOS BAR, extending the interface and content to serve users across languages.\nIntegrated Google Sheets API into GPOS BAR to connect the web application with an external data service.\nImproved on-page SEO and used Google Lighthouse to review website performance and identify areas for improvement.\nInvestigated and resolved frontend issues, focusing on interface behavior, usability, and overall website quality.',
    },
  },
  {
    _id: 'resume-software-and-scale',
    jobTitle: { th: 'ผู้ทดสอบซอฟต์แวร์ฝึกงาน', en: 'Software Tester Intern' },
    company: { th: 'Software and Scale', en: 'Software and Scale' },
    startDate: '2026-02-02', endDate: '2026-03-06', isCurrent: false,
    durationMonths: 1,
    description: {
      th: 'ทดสอบการทำงานของเว็บแอปพลิเคชันเพื่อค้นหาปัญหาด้านฟังก์ชันและการใช้งานจากมุมมองผู้ใช้\nทดสอบ REST APIs เพื่อตรวจสอบการทำงานและระบุปัญหาที่เกี่ยวข้องกับการสื่อสารข้อมูลของระบบ\nบันทึกข้อบกพร่องและอธิบายผลการทดสอบให้นักพัฒนาเข้าใจ เพื่อสนับสนุนการตรวจสอบและแก้ไขปัญหา\nทดสอบซ้ำหลังการแก้ไข และประสานงานกับนักพัฒนาเพื่อตรวจสอบว่าปัญหาที่รายงานได้รับการแก้ไขแล้ว',
      en: 'Performed functional and usability testing of web applications to identify issues affecting application behavior and the user experience.\nTested REST APIs to identify functional issues in application data interactions.\nDocumented defects and communicated test findings to developers, supporting issue investigation and resolution.\nRetested reported issues after fixes and collaborated with developers to verify that the identified problems were resolved.',
    },
  },
]

export const resumeProjects = [
  {
    _id: 'resume-rbc-go', title: { th: 'RBC Go', en: 'RBC Go' },
    slug: { current: 'rbc-go' }, projectUrl: 'https://rbc-website-go.vercel.app/th',
    summary: { th: 'ผลงานเว็บไซต์ RBC Go', en: 'RBC Go website portfolio.' },
  },
  {
    _id: 'resume-superblack', title: { th: 'Superblack', en: 'Superblack' },
    slug: { current: 'superblack' }, projectUrl: 'https://super-black-coffee.vercel.app/',
    summary: { th: 'ผลงานเว็บไซต์ Superblack', en: 'Superblack website portfolio.' },
  },
  {
    _id: 'resume-pawplan', title: { th: 'PawPlan — ระบบจัดการคลินิกสัตวแพทย์', en: 'PawPlan — Veterinary Clinic Management Website' },
    slug: { current: 'pawplan' },
    summary: {
      th: 'เว็บแอปพลิเคชันคลินิกสัตวแพทย์ พร้อมระบบนัดหมาย ยืนยันตัวตน และหน้าจอที่รองรับทุกอุปกรณ์ ออกแบบ User Flows และความสัมพันธ์ฐานข้อมูลสำหรับเจ้าของสัตว์เลี้ยง สัตวแพทย์ และงานคลินิก พร้อมพัฒนา REST APIs และเชื่อมต่อฐานข้อมูลด้วย Prisma',
      en: 'Developed a veterinary clinic web application with appointment booking, user authentication, and responsive interfaces. Designed user flows and database relationships for pet owners, veterinarians, and clinic operations. Built REST APIs and connected application features to the database using Prisma.',
    },
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'REST APIs'],
  },
]
