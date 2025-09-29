// Mock data utility สำหรับ @tanqory/mies
// อ้างอิงจาก next-ts pattern

// Text data
const _postTitles = [
  'แนวทางการพัฒนา Software Architecture แบบ Modern',
  'เทคนิค Performance Optimization สำหรับ React Application',
  'การจัดการ State Management ด้วย Redux Toolkit',
  'Best Practices สำหรับการเขียน TypeScript',
  'การออกแบบ Database Schema ที่มีประสิทธิภาพ',
  'Security Guidelines สำหรับ Web Development',
  'การใช้งาน Docker และ Kubernetes ในการ Deploy',
  'Microservices Architecture กับ Node.js',
  'การทดสอบ Automated Testing ด้วย Jest',
  'Progressive Web App (PWA) Development',
  'GraphQL vs REST API: เลือกใช้อย่างไร',
  'การปรับปรุง SEO สำหรับ Single Page Application',
  'Cloud Computing กับ AWS Services',
  'DevOps Practices สำหรับทีม Development',
  'Machine Learning Integration ใน Web App',
  'Blockchain Technology และการประยุกต์ใช้',
  'Mobile-First Design Approach',
  'การจัดการ Big Data ด้วย Modern Tools',
  'Artificial Intelligence ในการพัฒนา Software',
  'Serverless Architecture กับ AWS Lambda',
];

const _descriptions = [
  'เรียนรู้แนวทางการพัฒนา Software Architecture ที่ทันสมัยและมีประสิทธิภาพสำหรับโปรเจกต์ขนาดใหญ่',
  'เทคนิคและวิธีการปรับปรุงประสิทธิภาพของ React Application ให้รวดเร็วขึ้น',
  'การจัดการ State ในแอปพลิเคชันขนาดใหญ่ด้วย Redux Toolkit และ RTK Query',
  'หลักการและแนวทางปฏิบัติที่ดีในการเขียน TypeScript สำหรับโปรเจกต์ Enterprise',
  'การออกแบบและปรับปรุง Database Schema เพื่อประสิทธิภาพและ Scalability',
  'แนวทางรักษาความปลอดภัยใน Web Development ตั้งแต่ Frontend ถึง Backend',
  'การใช้ Container Technology เพื่อการ Deploy และ Scale Application',
  'สถาปัตยกรรม Microservices และการใช้งานกับ Node.js Ecosystem',
  'การสร้างและใช้งาน Automated Testing เพื่อคุณภาพ Code ที่ดีขึ้น',
  'การพัฒนา Progressive Web App ที่ทำงานได้เหมือน Native Application',
  'การเปรียบเทียบและเลือกใช้ GraphQL หรือ REST API ให้เหมาะสมกับโปรเจกต์',
  'เทคนิคการปรับปรุง SEO สำหรับ Single Page Application ด้วย Next.js',
  'การใช้งาน Cloud Services บน AWS เพื่อ Scalability และ Cost Efficiency',
  'การนำ DevOps Practices มาใช้ในทีม Development เพื่อ Continuous Delivery',
  'การผสาน Machine Learning Models เข้ากับ Web Application',
  'เทคโนโลยี Blockchain และการนำมาประยุกต์ใช้ในระบบต่างๆ',
  'แนวทาง Mobile-First ในการออกแบบ UI/UX ที่ตอบสนองทุกอุปกรณ์',
  'เครื่องมือและเทคนิคในการจัดการและวิเคราะห์ข้อมูลขนาดใหญ่',
  'การใช้ AI เพื่อช่วยในการพัฒนา Software และปรับปรุงประสิทธิภาพ',
  'Serverless Architecture และการใช้งาน AWS Lambda สำหรับ Backend Services',
];

const _fullNames = [
  'นายสมชาย ใจดี',
  'นางสาวมาลี สวยงาม',
  'นายปรีชา เก่งกาจ',
  'นางสาวสุดา นักเรียน',
  'นายวิชัย มั่นคง',
  'นางสาวนิดา อยู่ดี',
  'นายธนาคار รวยมาก',
  'นางสาวสมใจ ดีใจ',
  'นายสุรชัย กล้าหาญ',
  'นางสาวพิมพ์ใจ รักงาน',
  'นายชัยวัฒน์ สุขสม',
  'นางสาวกมลทิพย์ งามงาม',
  'นายอานนท์ มีสุข',
  'นางสาวจันทร์จิรา แจ่มใส',
  'นายประเสริฐ เจริญสุข',
  'นางสาวศุภลักษณ์ งดงาม',
  'นายวิรัช ห้าวหาญ',
  'นางสาวอรุณี สว่างแสง',
  'นายธีรภัทร มั่นใจ',
  'นางสาวสิริกานต์ รุ่งเรือง',
];

const _companyNames = [
  'บริษัท เทคโนโลยี จำกัด',
  'บริษัท ดิจิทัล มาร์เก็ต',
  'สตาร์ทอัพเทค จำกัด',
  'บริษัท ระบบสารสนเทศ',
  'เทคอินโนเวชั่น จำกัด',
  'บริษัท คลาวด์เทค',
  'ไอทีโซลูชั่น จำกัด',
  'บริษัท สมาร์ทซิสเต็ม',
  'เว็บดีไซน์ สตูดิโอ',
  'บริษัท โมบายแอป',
  'ไซเบอร์เซคิวริตี้ จำกัด',
  'บริษัท บิ๊กดาต้า',
  'เอไอเทคโนโลยี่ จำกัด',
  'บริษัท บล็อกเชน',
  'โฟนิกซ์ เทค จำกัด',
  'ดิจิตอล ทรานส์ฟอร์ม',
  'อินโนเวทีฟ โซลูชั่น',
  'บริษัท แพลตฟอร์ม',
  'เทคสตาร์ทอัพ จำกัด',
  'ฟิวเจอร์เทค จำกัด',
];

const _jobTitles = [
  'CEO',
  'Marketing Director',
  'Technical Lead',
  'Senior Developer',
  'UI/UX Designer',
  'Product Manager',
  'Data Scientist',
  'DevOps Engineer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Mobile Developer',
  'QA Engineer',
  'Business Analyst',
  'Project Manager',
  'System Administrator',
  'Database Administrator',
  'Security Engineer',
  'Cloud Architect',
  'Scrum Master',
];

// ID generation
const _ids = Array.from({ length: 24 }, (_, index) => `id-${index.toString().padStart(3, '0')}`);

// Generate placeholder images using Picsum (real photos)
function generatePlaceholderImage(index: number, width = 800, height = 600, type = 'cover'): string {
  // ใช้ Picsum photos ที่มีอยู่จริง
  const imageIds = [
    100, 101, 102, 103, 104, 106, 107, 108, 109, 110,
    111, 112, 113, 114, 115, 116, 117, 118, 119, 120,
    200, 201, 202, 203, 204, 206, 207, 208, 209, 210
  ];

  const imageId = imageIds[index % imageIds.length];

  // ใช้ picsum.photos สำหรับรูปภาพจริง
  if (type === 'avatar') {
    // Avatar ใช้รูปสี่เหลี่ยมจัตุรัส
    return `https://picsum.photos/seed/${(imageId ?? 0) + 1000}/${width}/${height}`;
  }

  return `https://picsum.photos/seed/${imageId}/${width}/${height}`;
}

// Main mock object
export const _mock = {
  id: (index: number) => _ids[index % _ids.length],
  postTitle: (index: number) => _postTitles[index % _postTitles.length],
  description: (index: number) => _descriptions[index % _descriptions.length],
  fullName: (index: number) => _fullNames[index % _fullNames.length],
  companyName: (index: number) => _companyNames[index % _companyNames.length],
  jobTitle: (index: number) => _jobTitles[index % _jobTitles.length],

  // Image generators
  image: {
    cover: (index: number) => generatePlaceholderImage(index, 800, 600, 'cover'),
    avatar: (index: number) => generatePlaceholderImage(index, 100, 100, 'avatar'),
    product: (index: number) => generatePlaceholderImage(index, 300, 300, 'product'),
    banner: (index: number) => generatePlaceholderImage(index, 1200, 400, 'banner'),
  },

  // Numbers
  number: {
    rating: (index: number) => Number((3.5 + (index % 15) * 0.1).toFixed(1)),
    price: (index: number) => [999, 1999, 2999, 3999, 4999, 5999][index % 6],
    percent: (index: number) => [10, 25, 50, 75, 85, 95][index % 6],
  },
};

// Export sample data generators for common use cases
export function generateSlides(count: number = 20) {
  return Array.from({ length: count }, (_, index) => ({
    id: _mock.id(index),
    title: _mock.postTitle(index),
    coverUrl: _mock.image.cover(index),
    description: _mock.description(index),
  }));
}

export function generateTestimonials(count: number = 6) {
  return Array.from({ length: count }, (_, index) => ({
    id: _mock.id(index),
    name: _mock.fullName(index),
    position: _mock.jobTitle(index),
    company: _mock.companyName(index),
    content: _mock.description(index),
    rating: _mock.number.rating(index),
    avatar: _mock.image.avatar(index),
  }));
}

export function generateProducts(count: number = 8) {
  return Array.from({ length: count }, (_, index) => ({
    id: _mock.id(index),
    name: _mock.postTitle(index),
    description: _mock.description(index),
    price: `฿${_mock.number.price(index)?.toLocaleString() ?? '0'}`,
    image: _mock.image.product(index),
    rating: _mock.number.rating(index),
  }));
}