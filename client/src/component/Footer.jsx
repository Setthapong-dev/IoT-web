import React from 'react'
import { Github, Mail, ExternalLink, Linkedin, Instagram } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="mt-12 w-full border-t footer-gradient">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white">KW</span>
            <span className="text-base font-semibold text-white">IoT Web Dev</span>
          </div>
          <p className="mt-3 text-sm text-blue-100">
            สร้างเว็บสมัยใหม่ด้วย React, Tailwind และเครื่องมือใหม่ล่าสุด
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">เมนู</h4>
          <ul className="mt-3 space-y-2 text-sm text-blue-100">
            <li><a className="hover:text-white transition-colors" href="#">หน้าแรก</a></li>
            <li><a className="hover:text-white transition-colors" href="#work">ผลงาน</a></li>
            <li><a className="hover:text-white transition-colors" href="#contact">ติดต่อเรา</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">ทรัพยากร</h4>
          <ul className="mt-3 space-y-2 text-sm text-blue-100">
            <li><a className="inline-flex items-center gap-1 hover:text-white transition-colors" href="https://github.com" target="_blank" rel="noreferrer"><ExternalLink className="h-3 w-3"/>เอกสาร</a></li>
            <li><a className="hover:text-white transition-colors" href="#blog">บล็อก</a></li>
            <li><a className="hover:text-white transition-colors" href="#faq">คำถามที่พบบ่อย</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">ติดตามเรา</h4>
          <div className="mt-3 flex items-center gap-3">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-blue-300 bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/20 transition-colors"><Github className="h-4 w-4"/>GitHub</a>
            <a href="mailto:example@example.com" className="inline-flex items-center gap-2 rounded-md border border-blue-300 bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/20 transition-colors"><Mail className="h-4 w-4"/>Email</a>
          </div>
          <div className="mt-2 flex items-center gap-3 text-blue-200">
            <a href="#" aria-label="LinkedIn" className="rounded-md p-1.5 hover:bg-white/10 transition-colors"><Linkedin className="h-5 w-5"/></a>
            <a href="#" aria-label="Instagram" className="rounded-md p-1.5 hover:bg-white/10 transition-colors"><Instagram className="h-5 w-5"/></a>
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row">
          <p className="text-sm text-blue-100">© {new Date().getFullYear()} IoT Web Dev • Setthapong-dev</p>
          <div className="flex items-center gap-4 text-xs text-blue-100">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer


