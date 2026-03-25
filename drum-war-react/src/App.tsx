import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams, useSearchParams, Link } from 'react-router-dom';
import {
  Search, LogIn, Home as HomeIcon, Gamepad2, TrendingUp, Dice5, Brain, Bell, Users,
  Flashlight as Flash, Star, LayoutDashboard, Settings, Package, CreditCard, ShieldCheck,
  UserPlus, Play, Eye, DollarSign, CheckCircle2, XCircle, ChevronRight, Menu
} from 'lucide-react';

type Team = 'red' | 'blue';
type GameMode = 'referee' | 'spectator';

interface GameState {
  redName: string;
  blueName: string;
  targetPoints: number;
  redScore: number;
  blueScore: number;
  currentTurn: Team;
  clickedBtns: string[];
  mainBgId: number;
  modalData: { cardImg: string; points: number; team: Team } | null;
}

const armsArray = [
  ["01.png", 35, 0], ["02.png", 18, 0], ["03.png", 20, 0], ["04.png", 11, 0], ["05.png", 6, 0],
  ["06.png", 9, 0], ["07.png", 8, 0], ["08.png", 10, 0], ["09.png", 0, 0], ["10.png", 0, 7],
  ["11.png", 6, 0], ["12.png", 1, 0], ["13.png", 0, 4], ["14.png", 7, 0], ["15.png", 9, 0],
  ["16.png", 0, 6], ["17.png", 3, 0], ["18.png", 16, 0], ["19.png", 10, 0], ["20.png", 15, 0],
  ["21.png", 16, 0], ["22.png", 14, 0], ["23.png", 6, 0], ["24.png", 4, 0], ["25.png", 5, 0],
  ["26.png", 0, 25], ["27.png", 0, 0], ["28.png", 0, 0], ["29.png", 22, 0], ["30.png", 0, 15],
  ["31.png", 2, 0], ["32.png", 9, 0], ["33.png", 0, 2], ["34.png", 13, 0], ["35.png", 25, 0],
  ["36.png", 0, 10], ["37.png", 3, 0], ["38.png", 0, 8], ["39.png", 0, 1], ["40.png", 19, 0],
  ["41.png", 0, 7], ["42.png", 0, 4], ["43.png", 6, 0], ["44.png", 0, 10], ["45.png", 0, 0],
  ["46.png", 0, 6], ["47.png", 0, 9], ["48.png", 0, 3], ["49.png", 0, 4], ["50.png", 2, 0],
  ["51.png", 0, 6], ["52.png", 4, 0], ["53.png", 3, 0], ["54.png", 2, 0], ["55.png", 3, 0],
  ["56.png", 0, 9], ["57.png", 6, 0], ["58.png", 0, 4], ["59.png", 7, 0], ["60.png", 0, 1],
  ["61.png", 0, 6], ["62.png", 9, 0], ["63.png", 0, 0], ["64.png", 7, 0]
];

const rightCol1 = [
  { id: 'btn1', icon: 'butterfly', color: 'btn-red' },
  { id: 'btn2', icon: 'pigeon', color: 'btn-red' },
  { id: 'btn3', icon: 'fish', color: 'btn-red' },
  { id: 'btn4', icon: 'giraffe', color: 'btn-red' },
  { id: 'btn5', icon: 'elephant', color: 'btn-pink' },
  { id: 'btn6', icon: 'deer', color: 'btn-pink' },
  { id: 'btn7', icon: 'camel', color: 'btn-pink' }
];

const rightCol2 = [
  { id: 'btn8', icon: 'donkey', color: 'btn-red' },
  { id: 'btn9', icon: 'duck', color: 'btn-red' },
  { id: 'btn10', icon: 'frog', color: 'btn-red' },
  { id: 'btn11', icon: 'lion', color: 'btn-pink' },
  { id: 'btn12', icon: 'mouse', color: 'btn-pink' },
  { id: 'btn13', icon: 'scorbion', color: 'btn-pink' },
  { id: 'btn14', icon: 'snail', color: 'btn-pink' }
];

const leftCol1 = [
  { id: 'btn15', icon: 'magnifier', color: 'btn-blue' },
  { id: 'btn16', icon: 'camera', color: 'btn-blue' },
  { id: 'btn17', icon: 'cressent', color: 'btn-blue' },
  { id: 'btn18', icon: 'eye', color: 'btn-sky' },
  { id: 'btn19', icon: 'heart', color: 'btn-sky' },
  { id: 'btn20', icon: 'house', color: 'btn-sky' },
  { id: 'btn21', icon: 'key', color: 'btn-sky' }
];

const leftCol2 = [
  { id: 'btn22', icon: 'lamp', color: 'btn-blue' },
  { id: 'btn23', icon: 'music', color: 'btn-blue' },
  { id: 'btn24', icon: 'message', color: 'btn-blue' },
  { id: 'btn25', icon: 'star', color: 'btn-blue' },
  { id: 'btn26', icon: 'plane', color: 'btn-sky' },
  { id: 'btn27', icon: 'phone', color: 'btn-sky' },
  { id: 'btn28', icon: 'pencil', color: 'btn-sky' }
];

const bottomRow1 = [
  { id: 'btn29', icon: 'cow', color: 'btn-purple' }, { id: 'btn30', icon: 'rabbit', color: 'btn-purple' },
  { id: 'btn31', icon: '1', color: 'btn-yellow' }, { id: 'btn32', icon: '2', color: 'btn-yellow' },
  { id: 'btn33', icon: '3', color: 'btn-green' }, { id: 'btn34', icon: '4', color: 'btn-green' },
  { id: 'btn35', icon: '5', color: 'btn-orange' }, { id: 'btn40', icon: '6', color: 'btn-orange' },
  { id: 'btn36', icon: 'bomb', color: 'btn-teal' }, { id: 'btn37', icon: 'case', color: 'btn-teal' }
];

const bottomRow2 = [
  { id: 'btn38', icon: 'roaster', color: 'btn-purple' }, { id: 'btn39', icon: 'snake', color: 'btn-purple' },
  { id: 'btn41', icon: '7', color: 'btn-yellow' }, { id: 'btn42', icon: '8', color: 'btn-yellow' },
  { id: 'btn43', icon: '9', color: 'btn-green' }, { id: 'btn44', icon: '10', color: 'btn-green' },
  { id: 'btn49', icon: '11', color: 'btn-orange' }, { id: 'btn50', icon: '12', color: 'btn-orange' },
  { id: 'btn45', icon: 'feather', color: 'btn-teal' }, { id: 'btn46', icon: 'lock', color: 'btn-teal' }
];

const bottomRow3 = [
  { id: 'btn47', icon: 'sparrow', color: 'btn-purple' }, { id: 'btn48', icon: 'turtle', color: 'btn-purple' },
  { id: 'btn51', icon: '13', color: 'btn-yellow' }, { id: 'btn52', icon: '14', color: 'btn-yellow' },
  { id: 'btn53', icon: '15', color: 'btn-green' }, { id: 'btn58', icon: '16', color: 'btn-green' },
  { id: 'btn59', icon: '17', color: 'btn-orange' }, { id: 'btn60', icon: '18', color: 'btn-orange' },
  { id: 'btn54', icon: 'magnet', color: 'btn-teal' }, { id: 'btn55', icon: 'globe', color: 'btn-teal' }
];

const imgBase = "/images/";
const cardBase = "/img/war/war_wpn_images/";

// --- ADMIN DASHBOARD COMPONENT ---
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-[#0a0b10] text-white font-[Cairo] flex" dir="rtl">
      {/* Sidebar Admin */}
      <aside className="w-72 bg-[#0d0f14] border-l border-white/5 p-6 flex flex-col gap-8 sticky top-0 h-screen">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-gradient-to-br from-[#cdb035] to-[#7d661b] rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/10">
            <ShieldCheck className="text-black w-6 h-6" />
          </div>
          <div>
            <h2 className="font-black text-xl tracking-tighter" style={{ fontFamily: 'titri' }}>لوحة التحكم</h2>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Gharibgo Admin</p>
          </div>
        </div>

        <Link to="/" className="flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-2xl text-xs font-bold text-gray-400 hover:text-white transition-all no-underline">
          <ChevronRight size={16} /> العودة للموقع
        </Link>

        <nav className="space-y-2 flex-1">
          {[
            { id: 'overview', label: 'الإحصائيات العامة', icon: LayoutDashboard },
            { id: 'users', label: 'إدارة المشتركين', icon: Users },
            { id: 'games', label: 'إدارة الألعاب', icon: Gamepad2 },
            { id: 'subs', label: 'الاشتراكات والفوترة', icon: CreditCard },
            { id: 'settings', label: 'إعدادات المنصة', icon: Settings }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all border-none cursor-pointer font-black text-sm ${activeTab === item.id ? 'bg-[#cdb035] text-black shadow-lg shadow-yellow-500/20' : 'text-gray-400 hover:bg-white/5'}`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 bg-white/5 rounded-[2rem] border border-white/5 text-center">
          <p className="text-xs text-gray-500 mb-3">الدخول بصلاحية</p>
          <h4 className="font-black text-[#cdb035]">المدير العام</h4>
          <button className="mt-4 w-full bg-red-500/10 text-red-500 py-2 rounded-xl text-xs font-bold hover:bg-red-500 hover:text-white transition-all border-none cursor-pointer">تسجيل الخروج</button>
        </div>
      </aside>

      {/* Main Content Admin */}
      <main className="flex-1 p-10 overflow-y-auto max-h-screen custom-scrollbar">
        {/* Header Admin */}
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black mb-2" style={{ fontFamily: 'titri' }}>مرحباً بك، المدير</h1>
            <p className="text-gray-500 font-medium">إليك ملخص ما يحدث في منصة Gharibgo اليوم.</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-white/10 transition-all cursor-pointer">
              <Bell size={18} className="text-gray-400" />
              التنبيهات
            </button>
            <button className="bg-[#cdb035] text-black px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 hover:scale-105 transition-all cursor-pointer shadow-lg shadow-yellow-500/10 border-none">
              <UserPlus size={18} />
              إضافة مسؤول
            </button>
          </div>
        </header>

        {activeTab === 'overview' && (
          <div className="space-y-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {[
                { label: 'إجمالي المشتركين', value: '12,450', grow: '+12%', color: 'emerald' },
                { label: 'الأرباح الشهرية', value: '$8,240', grow: '+5%', color: 'yellow' },
                { label: 'ألعاب نشطة', value: '24', grow: '0%', color: 'blue' },
                { label: 'طلبات الدعم', value: '18', grow: '-2%', color: 'red' }
              ].map((stat, i) => (
                <div key={i} className="bg-[#12141d] p-6 rounded-[2.5rem] border border-white/5 space-y-4">
                  <p className="text-xs text-gray-500 font-black uppercase tracking-widest">{stat.label}</p>
                  <div className="flex items-end justify-between">
                    <h3 className="text-3xl font-black">{stat.value}</h3>
                    <span className={`text-xs font-black p-1 px-2 rounded-lg bg-${stat.color}-500/10 text-${stat.color}-500`}>{stat.grow}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activities */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
              <section className="bg-[#12141d] rounded-[3rem] p-8 border border-white/5">
                <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                  <Users className="text-[#cdb035]" /> آخر المشتركين
                </h3>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-tr from-gray-700 to-gray-800 rounded-full"></div>
                        <div>
                          <p className="font-black text-sm">أحمد الغامدي</p>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Premium Member</p>
                        </div>
                      </div>
                      <button className="text-gray-500 hover:text-white"><ChevronRight size={18} /></button>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-[#12141d] rounded-[3rem] p-8 border border-white/5">
                <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                  <Gamepad2 className="text-emerald-500" /> أكثر الألعاب ربحاً
                </h3>
                <div className="space-y-4">
                  {[
                    { title: 'طبول الحرب', rev: '$3,200', subs: '450' },
                    { title: 'لودو العرب', rev: '$1,850', subs: '210' },
                    { title: 'حكم ورق', rev: '$1,100', subs: '95' }
                  ].map((game, i) => (
                    <div key={i} className="flex items-center justify-between p-5 bg-black/40 rounded-3xl border border-white/5">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#cdb035]">
                          <Gamepad2 size={24} />
                        </div>
                        <div>
                          <p className="font-black text-lg">{game.title}</p>
                          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{game.subs} مشتركون نشطون</p>
                        </div>
                      </div>
                      <div className="text-left font-black text-emerald-400 text-xl">{game.rev}</div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}

        {activeTab === 'games' && (
          <div className="space-y-10">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black" style={{ fontFamily: 'titri' }}>إدارة الألعاب والمميزات</h2>
              <button className="bg-[#cdb035] text-black px-8 py-3 rounded-2xl font-black text-sm shadow-xl shadow-yellow-500/10 border-none cursor-pointer">إضافة لعبة جديدة</button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {[
                { name: 'طبول الحرب', type: 'نصف مدفوعة', price: '29$ / شهر', status: 'نشط', feat: 'المشاهدة الحية (مدفوعة)' },
                { name: 'لودو العرب', type: 'مجانية', price: '0$', status: 'نشط', feat: 'تبديل النرد (مدفوع)' },
                { name: 'حكم ورق', type: 'مدفوعة بالكامل', price: '49$ / شهر', status: 'تجريبي', feat: 'كل المزايا مفتوحة' }
              ].map((game, i) => (
                <div key={i} className="bg-[#12141d] p-8 rounded-[3rem] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 group">
                  <div className="flex items-center gap-8 flex-1">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#1a1c26] to-black rounded-[2rem] border border-white/5 flex items-center justify-center text-[#cdb035] group-hover:scale-110 transition-transform duration-500">
                      <Gamepad2 size={36} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black">{game.name}</h3>
                      <div className="flex gap-4">
                        <span className="bg-[#cdb035]/10 text-[#cdb035] px-3 py-1 rounded-full text-[10px] font-black">{game.type}</span>
                        <span className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[10px] font-black">{game.price}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 bg-black/40 p-4 rounded-2xl border border-white/5">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">الميزة المدفوعة حالياً:</p>
                    <p className="font-black text-sm flex items-center gap-2">
                      <DollarSign size={14} className="text-emerald-500" />
                      {game.feat}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <button className="bg-white/5 border border-white/10 px-6 py-3 rounded-xl font-bold text-xs hover:bg-white/10 transition-all cursor-pointer">تعديل المزايا</button>
                    <button className="bg-red-500/10 text-red-500 border border-red-500/20 px-6 py-3 rounded-xl font-bold text-xs hover:bg-red-500 hover:text-white transition-all cursor-pointer">إيقاف مؤقت</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-10">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black" style={{ fontFamily: 'titri' }}>إدارة المشتركين</h2>
              <div className="flex gap-4">
                <div className="bg-[#1a1c26] rounded-xl px-4 py-2 border border-white/5 flex items-center gap-3 w-64">
                  <Search size={16} className="text-gray-500" />
                  <input type="text" placeholder="بحث عن مستخدم..." className="bg-transparent border-none outline-none text-xs text-white w-full" />
                </div>
                <button className="bg-[#cdb035] text-black px-6 py-2 rounded-xl font-black text-xs border-none cursor-pointer">تصدير البيانات</button>
              </div>
            </div>

            <div className="bg-[#12141d] rounded-[3rem] border border-white/5 overflow-hidden">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-white/5 text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                    <th className="p-6">المستخدم</th>
                    <th className="p-6">نوع الاشتراك</th>
                    <th className="p-6">تاريخ الانضمام</th>
                    <th className="p-6">الحالة</th>
                    <th className="p-6 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { name: 'أحمد الغامدي', email: 'ahmed@example.com', sub: 'Premium', date: '2024-03-12', status: 'نشط' },
                    { name: 'سارة خالد', email: 'sara@example.com', sub: 'Free', date: '2024-03-10', status: 'نشط' },
                    { name: 'محمد علي', email: 'm.ali@example.com', sub: 'VIP', date: '2024-03-05', status: 'محظور' },
                    { name: 'ليلى يوسف', email: 'laila@example.com', sub: 'Premium', date: '2024-02-28', status: 'نشط' },
                    { name: 'عمر القحطاني', email: 'omar@example.com', sub: 'Free', date: '2024-02-15', status: 'نشط' }
                  ].map((user, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gradient-to-tr from-[#cdb035]/20 to-[#cdb035]/5 rounded-xl flex items-center justify-center text-[#cdb035] font-black">
                            {user.name[0]}
                          </div>
                          <div>
                            <p className="font-black text-sm">{user.name}</p>
                            <p className="text-xs text-gray-600">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black ${user.sub === 'VIP' ? 'bg-purple-500/10 text-purple-400' :
                          user.sub === 'Premium' ? 'bg-[#cdb035]/10 text-[#cdb035]' :
                            'bg-gray-500/10 text-gray-500'
                          }`}>
                          {user.sub}
                        </span>
                      </td>
                      <td className="p-6 text-xs text-gray-500 font-bold">{user.date}</td>
                      <td className="p-6">
                        <span className={`flex items-center gap-1.5 text-xs font-bold ${user.status === 'نشط' ? 'text-emerald-500' : 'text-red-500'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'نشط' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                          {user.status}
                        </span>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2 hover:bg-white/10 rounded-lg text-gray-500 hover:text-white transition-all border-none cursor-pointer"><Settings size={14} /></button>
                          <button className="p-2 hover:bg-red-500/10 rounded-lg text-gray-500 hover:text-red-500 transition-all border-none cursor-pointer"><XCircle size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'subs' && (
          <div className="space-y-10">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black" style={{ fontFamily: 'titri' }}>خطط الاشتراكات</h2>
              <button className="bg-[#cdb035] text-black px-8 py-3 rounded-2xl font-black text-sm border-none cursor-pointer">إضافة خطة جديدة</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'الخطة المجانية', price: '0$', features: ['ألعاب الحظ المحدودة', 'إعلانات مدمجة', 'دعم فني عادي'], color: 'gray' },
                { name: 'عضوية Premium', price: '19$ / شهر', features: ['كل ألعاب الحظ', 'لا توجد إعلانات', 'دعم فني مدار الساعة', 'خصومات حصرية'], color: 'yellow' },
                { name: 'العضوية الملكية VIP', price: '49$ / شهر', features: ['كل الألعاب مفتوحة', 'مزايا المشاهدة الحية', 'بطولات خاصة', 'لوحة تحكم خاصة للغرف'], color: 'purple' }
              ].map((plan, i) => (
                <div key={i} className="bg-[#12141d] p-8 rounded-[3rem] border border-white/5 relative overflow-hidden group">
                  {plan.name.includes('Premium') && <div className="absolute top-0 left-0 w-full h-1 bg-[#cdb035]"></div>}
                  <h3 className="text-xl font-black mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl font-black">{plan.price.split(' ')[0]}</span>
                    <span className="text-xs text-gray-500 font-bold uppercase">{plan.price.includes('/') ? '/ شهر' : ''}</span>
                  </div>
                  <ul className="space-y-4 mb-10">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-gray-400 font-medium">
                        <CheckCircle2 size={16} className="text-[#cdb035]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-xs hover:bg-white/10 transition-all border-none cursor-pointer">تعديل الخطة</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-4xl space-y-10">
            <h2 className="text-3xl font-black" style={{ fontFamily: 'titri' }}>إعدادات المنصة</h2>

            <div className="bg-[#12141d] p-10 rounded-[3rem] border border-white/5 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs text-gray-500 font-black uppercase tracking-widest">اسم المنصة</label>
                  <input type="text" defaultValue="Gharibgo" className="w-full bg-black/40 border border-white/5 p-4 rounded-2xl outline-none focus:border-[#cdb035] transition-all text-white font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-500 font-black uppercase tracking-widest">توقيت السيرفر</label>
                  <input type="text" defaultValue="UTC (EET)" className="w-full bg-black/40 border border-white/5 p-4 rounded-2xl outline-none focus:border-[#cdb035] transition-all text-white font-bold" />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs text-gray-500 font-black uppercase tracking-widest block">خيارات التفعيل</label>
                {[
                  { label: 'وضع الصيانة (Maintenance Mode)', desc: 'إيقاف دخول اللاعبين مؤقتاً للتحديث.', active: false },
                  { label: 'تسجيل اللاعبين الجدد', desc: 'السماح للزوار بإنشاء حسابات جديدة.', active: true },
                  { label: 'الدفع الإلكتروني', desc: 'تفعيل بوابات الدفع للاشتراكات.', active: true }
                ].map((opt, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-white/5">
                    <div>
                      <p className="font-black text-sm">{opt.label}</p>
                      <p className="text-xs text-gray-600">{opt.desc}</p>
                    </div>
                    <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-all ${opt.active ? 'bg-[#cdb035]' : 'bg-gray-700'}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${opt.active ? 'left-1' : 'right-1'}`}></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/5">
                <button className="bg-[#cdb035] text-black px-10 py-4 rounded-2xl font-black shadow-xl shadow-yellow-500/10 hover:scale-105 transition-all border-none cursor-pointer">حفظ جميع التغييرات</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// --- HOME (GAME PORTAL) ---
const Home = () => {
  const navigate = useNavigate();

  const games = [
    {
      id: 'drum-war',
      title: 'طبول الحرب',
      description: 'لعبة استراتيجية مثيرة تعتمد على الحظ والذكاء. اختر أسلحتك بحذر واهزم خصمك!',
      image: '/img/random/1.png',
      path: '/drum-war/create',
      status: 'متوفر الآن',
      category: 'ألعاب الحظ',
      players: '1.2k',
      rating: 4.8
    },
    {
      id: 'soon-1',
      title: 'لودو العرب',
      description: 'استعد للعبة اللودو الكلاسيكية بلمسة شرقية جديدة تماماً.',
      image: '/img/random/2.png',
      path: '#',
      status: 'قريباً',
      category: 'ألعاب الذكاء',
      players: '0',
      rating: 0
    },
    {
      id: 'soon-2',
      title: 'حكم ورق',
      description: 'أقوى تحديات الورق في انتظاركم. من سيكون الملك؟',
      image: '/img/random/3.png',
      path: '#',
      status: 'قريباً',
      category: 'ألعاب الحظ',
      players: '0',
      rating: 0
    }
  ];

  return (
    <div className="min-h-screen w-full bg-[#0a0b10] text-white overflow-x-hidden font-[Cairo] flex flex-col" dir="rtl">
      {/* --- TOP NAVBAR --- */}
      <nav className="sticky top-0 z-50 bg-[#0d0f14]/90 backdrop-blur-2xl border-b border-yellow-500/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-[#cdb035] via-[#a88a2a] to-[#7d661b] rounded-2xl flex items-center justify-center transform group-hover:rotate-180 transition-transform duration-700 shadow-lg shadow-yellow-500/20">
              <Gamepad2 className="text-black w-7 h-7" />
            </div>
            <span className="text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#cdb035] to-[#fff]" style={{ fontFamily: 'titri' }}>gharibgo</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8 text-sm font-black text-gray-400">
            <Link to="/" className="text-[#cdb035] hover:text-white transition-colors flex items-center gap-1 border-b-2 border-[#cdb035] pb-1">الرئيسية</Link>
            <Link to="/admin" className="hover:text-[#cdb035] transition-colors flex items-center gap-2"><LayoutDashboard size={14} /> لوحة الإشراف</Link>
            <Link to="#" className="hover:text-[#cdb035] transition-colors">المسابقات</Link>
            <Link to="#" className="hover:text-[#cdb035] transition-colors">تحدي الغريب</Link>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden md:flex items-center bg-[#1a1c26] rounded-2xl px-5 py-2.5 border border-yellow-500/5 w-72 focus-within:border-[#cdb035]/50 transition-all shadow-inner">
            <Search className="text-gray-500 w-4 h-4" />
            <input
              type="text"
              placeholder="ابحث عن الغموض..."
              dir="rtl"
              className="bg-transparent border-none outline-none text-sm w-full px-3 text-gray-300 placeholder:text-gray-600 text-right"
            />
          </div>
          <button className="bg-gradient-to-r from-[#cdb035] to-[#7d661b] hover:from-[#eecb45] hover:to-[#cdb035] px-8 py-2.5 rounded-2xl font-black text-black shadow-xl shadow-yellow-500/10 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border-none cursor-pointer">
            <LogIn size={18} /> دخول الأعضاء
          </button>
        </div>
      </nav>

      <div className="flex flex-1 max-w-[1600px] mx-auto w-full overflow-hidden" dir="rtl">
        {/* --- RIGHT SIDEBAR --- */}
        <aside className="hidden xl:block w-80 p-6 space-y-10 border-l border-white/5 bg-[#0a0b10]/80 text-right overflow-y-auto">
          <div className="space-y-6">
            <div className="space-y-3">
              <button className="w-full bg-[#cdb035]/10 border border-[#cdb035]/30 p-5 rounded-[2rem] flex items-center justify-between group text-white cursor-pointer hover:bg-[#cdb035]/20 transition-all">
                <div className="flex items-center gap-4 text-[#cdb035]">
                  <div className="w-10 h-10 bg-[#cdb035] rounded-xl flex items-center justify-center text-black shadow-lg shadow-yellow-500/20">
                    <HomeIcon size={20} />
                  </div>
                  <span className="font-black text-lg">الرئيسية</span>
                </div>
              </button>

              <button className="w-full hover:bg-white/5 p-5 rounded-[2rem] flex items-center justify-between transition-all group bg-transparent border-none text-white cursor-pointer">
                <div className="flex items-center gap-4 text-gray-400 group-hover:text-[#cdb035] transition-all">
                  <Gamepad2 size={20} />
                  <span className="font-black">جديد الألعاب</span>
                </div>
                <Bell size={16} className="text-gray-700" />
              </button>

              <button className="w-full hover:bg-white/5 p-5 rounded-[2rem] flex items-center justify-between transition-all group bg-transparent border-none text-white cursor-pointer">
                <div className="flex items-center gap-4 text-gray-400 group-hover:text-emerald-400 transition-all">
                  <TrendingUp size={20} />
                  <span className="font-black">الأكثر حماساً</span>
                </div>
              </button>
            </div>
          </div>

          <div className="px-4 space-y-6">
            <div className="flex items-center gap-3 justify-start">
              <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
              <h4 className="text-sm font-black text-gray-500 uppercase tracking-[0.2em]">عالم الغريب</h4>
            </div>

            <div className="space-y-4">
              <button className="w-full flex items-center justify-between group bg-transparent border-none text-white cursor-pointer hover:text-indigo-400 transition-all p-2 rounded-xl hover:bg-white/5">
                <div className="flex items-center gap-4 text-gray-400 group-hover:text-[#cdb035] transition-all">
                  <Dice5 size={22} className="group-hover:rotate-12 transition-transform" />
                  <span className="font-black text-right text-base font-[Cairo]">ألعاب الحظ</span>
                </div>
                <span className="bg-[#cdb035]/10 border border-[#cdb035]/20 px-3 py-1 rounded-full text-[10px] text-[#cdb035] font-bold">12</span>
              </button>
              <button className="w-full flex items-center justify-between group bg-transparent border-none text-white cursor-pointer hover:text-emerald-400 transition-all p-2 rounded-xl hover:bg-white/5">
                <div className="flex items-center gap-4 text-gray-400 group-hover:text-emerald-400 transition-all">
                  <Brain size={22} className="group-hover:scale-110 transition-transform" />
                  <span className="font-black text-right text-base font-[Cairo]">ألعاب الذكاء</span>
                </div>
                <span className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-[10px] text-emerald-400 font-bold">8</span>
              </button>
            </div>
          </div>

          <div className="mt-20 p-6 rounded-[2.5rem] bg-gradient-to-br from-[#1a1c26] to-black border border-yellow-500/10 text-center space-y-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#cdb035]/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-[#cdb035]/10 transition-colors"></div>
            <p className="text-xs text-[#cdb035] font-black uppercase tracking-widest">عرض خاص</p>
            <h5 className="text-xl font-bold">انضم لنادي الغريب</h5>
            <p className="text-xs text-gray-500">احصل على جواهر يومية ومميزات حصرية لم تشهدها من قبل.</p>
            <button className="w-full bg-white text-black py-3 rounded-2xl font-black text-sm hover:scale-105 transition-all outline-none border-none cursor-pointer">اشترك الآن</button>
          </div>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1 p-6 lg:p-12 space-y-16 overflow-y-auto max-h-[calc(100vh-64px)] custom-scrollbar text-right" dir="rtl">

          {/* --- HERO BANNER (Redesigned) --- */}
          <div className="relative rounded-[3rem] overflow-hidden min-h-[500px] border border-white/5 shadow-2xl group flex items-center">
            {/* Dynamic background with animated overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src="/img/bg.png"
                className="w-full h-full object-cover opacity-20 transition-transform duration-[30s] ease-linear group-hover:scale-125 saturate-0"
                alt="Background"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0b10] via-[#0a0b10]/95 to-transparent"></div>
              <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#0a0b10] opacity-80"></div>
            </div>

            <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 px-10 lg:px-20 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl text-[#cdb035] text-xs font-black uppercase tracking-widest">
                  <Flash size={14} className="animate-bounce" />
                  الأكثر تميزاً في 2026
                </div>

                <div className="space-y-4">
                  <h1 className="text-5xl lg:text-6xl font-black leading-tight text-white mb-0" style={{ fontFamily: 'titri' }}>
                    عالم <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#cdb035] to-[#fff] drop-shadow-lg">Gharibgo</span> الرهيب
                  </h1>
                  <h2 className="text-3xl lg:text-4xl font-black text-gray-400 opacity-80" style={{ fontFamily: 'titri' }}>
                    وجهتك المثالية للترفيه غير المحدود
                  </h2>
                </div>

                <p className="text-lg text-gray-400 max-w-lg leading-relaxed font-medium">
                  انضم إلى آلاف اللاعبين في تجربة فريدة، اكتشف أسرار الغرف المغلقة وحقق أعلى الانتصارات مع أصدقائك في عالم Gharib.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <button className="bg-[#cdb035] text-black px-10 py-4 rounded-2xl font-black text-lg hover:scale-105 hover:bg-white transition-all shadow-xl shadow-yellow-500/10 border-none cursor-pointer">
                    ابدأ التجربة الآن
                  </button>
                  <button className="bg-white/5 backdrop-blur-md text-white border border-white/10 px-10 py-4 rounded-2xl font-black text-lg hover:bg-white/10 transition-all cursor-pointer">
                    حول المنصة
                  </button>
                </div>
              </div>

              <div className="hidden lg:block relative">
                {/* Visual Element for Hero Right Side */}
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  <div className="absolute inset-0 bg-[#cdb035]/20 blur-[120px] rounded-full animate-pulse"></div>
                  <div className="relative z-10 w-full h-full bg-gradient-to-tr from-[#1a1c26] to-[#0a0b10] border-4 border-white/5 rounded-[4rem] shadow-2xl flex items-center justify-center p-8 transform rotate-6 hover:rotate-0 transition-transform duration-700">
                    <div className="text-center space-y-6">
                      <div className="w-24 h-24 bg-[#cdb035] rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-yellow-500/20">
                        <Gamepad2 size={48} className="text-black" />
                      </div>
                      <h3 className="text-3xl font-black" style={{ fontFamily: 'titri' }}>انضم للحرب</h3>
                      <p className="text-sm text-gray-500 font-bold">أدخل كود الغرفة لبدء التحدي مباشرة</p>
                      <div className="relative pt-4">
                        <input
                          type="text"
                          placeholder="الكود هنا..."
                          className="w-full bg-black/50 border-2 border-white/5 rounded-2xl py-4 px-6 text-center text-xl font-bold text-[#cdb035] focus:border-[#cdb035] transition-all outline-none"
                        />
                        <button className="absolute left-2 top-6 aspect-square bg-[#cdb035] rounded-xl flex items-center justify-center text-black hover:scale-110 transition-all border-none cursor-pointer">
                          <LogIn size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full"></div>
                  <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* --- RECENTLY TRENDING (Small Section) --- */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-emerald-500" />
              <h3 className="text-xl font-black text-gray-400 tracking-widest uppercase">الأكثر رواجاً الآن</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-3xl flex items-center gap-4 hover:bg-white/10 transition-all cursor-pointer group">
                  <div className="w-12 h-12 rounded-2xl bg-[#cdb035]/10 flex items-center justify-center text-[#cdb035] group-hover:bg-[#cdb035] group-hover:text-black transition-all">
                    <Star size={20} />
                  </div>
                  <div>
                    <p className="font-black text-sm">البطولة الكبرى</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">نشط الآن</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* --- GAME GRID (Redesigned Cards) --- */}
          <section className="space-y-12 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <h2 className="text-4xl lg:text-5xl font-black" style={{ fontFamily: 'titri' }}>اكتشف <span className="text-[#cdb035]">أفضل</span> الألعاب</h2>
                <p className="text-gray-500 font-medium text-lg">مجموعة مختارة بعناية لأجواء حماسية لا تنسى</p>
              </div>

              <div className="flex gap-2 bg-[#12141d] p-1.5 rounded-2xl border border-white/5">
                <button className="px-10 py-3 bg-[#cdb035] rounded-xl text-sm font-black text-black transition-all border-none cursor-pointer">الكل</button>
                <button className="px-10 py-3 bg-transparent rounded-xl text-sm font-black text-gray-400 hover:text-white transition-all border-none cursor-pointer">ألعاب الحظ</button>
                <button className="px-10 py-3 bg-transparent rounded-xl text-sm font-black text-gray-400 hover:text-white transition-all border-none cursor-pointer">ألعاب الذكاء</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
              {games.map((game) => (
                <div
                  key={game.id}
                  onClick={() => game.path !== '#' && navigate(game.path)}
                  className={`group relative perspective-1000 ${game.path === '#' ? 'opacity-70' : ''}`}
                >
                  <div className="relative bg-[#12141d] rounded-[3rem] border border-white/5 overflow-hidden transition-all duration-700 group-hover:shadow-[0_40px_100px_-20px_rgba(205,176,53,0.15)] group-hover:-translate-y-4">
                    {/* Card Header/Image */}
                    <div className="h-64 overflow-hidden relative">
                      <img src={game.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={game.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#12141d] to-transparent opacity-80"></div>

                      {/* Status Badges */}
                      <div className="absolute top-6 left-6 flex gap-2">
                        <div className="bg-emerald-500/90 backdrop-blur-xl text-white px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1">
                          <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                          {game.players} يلعبون
                        </div>
                      </div>
                      <div className="absolute top-6 right-6">
                        <div className="bg-black/60 backdrop-blur-xl text-[#cdb035] px-4 py-1.5 rounded-2xl text-[10px] font-black border border-white/10 uppercase tracking-widest">
                          {game.category}
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-10 space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-3xl font-black text-white" style={{ fontFamily: 'titri' }}>{game.title}</h3>
                        <div className="flex items-center gap-1 text-[#cdb035]">
                          <Star size={14} fill="#cdb035" />
                          <span className="text-xs font-black">{game.rating}</span>
                        </div>
                      </div>

                      <p className="text-gray-500 font-medium text-sm leading-relaxed min-h-[48px]">
                        {game.description}
                      </p>

                      <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users size={16} />
                          <span className="text-xs font-black lowercase">{game.players} Players</span>
                        </div>
                        <button className="bg-[#cdb035]/10 hover:bg-[#cdb035] text-[#cdb035] hover:text-black py-2.5 px-6 rounded-xl font-black text-xs transition-all border border-[#cdb035]/20 border-none cursor-pointer">
                          العب الآن →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <footer className="border-t border-white/5 py-12 opacity-50">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
                  <Gamepad2 size={16} className="text-gray-400" />
                </div>
                <p className="text-sm font-black tracking-wider">© 2026 جميع الحقوق محفوظة لمنصة <span className="text-[#cdb035]">Gharibgo</span></p>
              </div>
              <div className="flex gap-10 text-xs font-black text-gray-500 uppercase tracking-widest">
                <Link to="#" className="hover:text-[#cdb035] transition-colors">شروط الاستخدام</Link>
                <Link to="#" className="hover:text-[#cdb035] transition-colors">سياسة الخصوصية</Link>
                <Link to="#" className="hover:text-[#cdb035] transition-colors">الدعم الفني</Link>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

// --- DRUM WAR SETUP COMPONENT ---
const DrumWarSetup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    redName: 'الجيش الأحمر',
    blueName: 'الجيش الأزرق',
    targetPoints: 250
  });

  const createRoom = () => {
    const roomId = Math.random().toString(36).substring(2, 7).toUpperCase();
    const initialState: GameState = {
      redName: formData.redName,
      blueName: formData.blueName,
      targetPoints: formData.targetPoints,
      redScore: formData.targetPoints,
      blueScore: formData.targetPoints,
      currentTurn: 'red',
      clickedBtns: [],
      mainBgId: 1,
      modalData: null
    };
    localStorage.setItem(`room_${roomId}`, JSON.stringify(initialState));
    navigate(`/game/${roomId}?role=referee`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm w-full font-[Cairo]" dir="rtl">
      <div className="bg-[#12141d] p-8 rounded-[3rem] border-4 border-[#cdb035]/30 shadow-2xl w-full max-w-md text-right border-white/10" dir="rtl">
        <h1 className="text-4xl text-center mb-8 font-black text-white tracking-widest text-stroke" style={{ fontFamily: 'titri' }}>إنشاء طاولة حرب</h1>

        <div className="space-y-6">
          <div>
            <label className="block text-red-500 mb-2 font-bold">اسم الفريق الأحمر</label>
            <input
              className="w-full bg-red-900/10 border-2 border-red-500/30 rounded-2xl p-4 text-white outline-none focus:border-red-500 transition-all font-bold text-right"
              dir="rtl"
              value={formData.redName}
              onChange={e => setFormData(p => ({ ...p, redName: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-blue-500 mb-2 font-bold">اسم الفريق الأزرق</label>
            <input
              className="w-full bg-blue-900/10 border-2 border-blue-500/30 rounded-2xl p-4 text-white outline-none focus:border-blue-500 transition-all font-bold text-right"
              dir="rtl"
              value={formData.blueName}
              onChange={e => setFormData(p => ({ ...p, blueName: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-[#cdb035] mb-2 font-bold">نقاط الانتصار</label>
            <input
              type="number"
              className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 text-white outline-none focus:border-[#cdb035] transition-all font-bold text-right"
              dir="rtl"
              value={formData.targetPoints}
              onChange={e => setFormData(p => ({ ...p, targetPoints: parseInt(e.target.value) || 0 }))}
            />
          </div>

          <button
            onClick={createRoom}
            className="w-full bg-gradient-to-r from-[#cdb035] to-[#7d661b] hover:scale-[1.02] text-black font-black py-5 rounded-2xl text-2xl shadow-xl shadow-yellow-500/20 active:scale-95 transition-all mt-4 border border-white/10 cursor-pointer"
            style={{ fontFamily: 'titri' }}
          >
            بدء الحرب 🔥
          </button>
        </div>
      </div>
    </div>
  );
};

function Game() {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const role = (searchParams.get('role') as GameMode) || 'spectator';

  const [currentTurn, setCurrentTurn] = useState<Team>('red');
  const [scores, setScores] = useState({ red: 350, blue: 350 });
  const [teamNames, setTeamNames] = useState({ red: 'الجيش الأحمر', blue: 'الجيش الأزرق' });
  const [clickedBtns, setClickedBtns] = useState<Set<string>>(new Set());
  const [modalData, setModalData] = useState<{ cardImg: string; points: number; team: Team; } | null>(null);
  const [mainBgId, setMainBgId] = useState(1);
  const [shuffledCards, setShuffledCards] = useState<typeof armsArray>([]);

  const changeMainImage = () => {
    if (role === 'spectator') return;
    setMainBgId((Math.floor(Math.random() * 5) + 1));
  };

  useEffect(() => {
    const shuffled = [...armsArray].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
  }, []);

  // Sync Logic
  useEffect(() => {
    const interval = setInterval(() => {
      const saved = localStorage.getItem(`room_${roomId}`);
      if (saved) {
        const state: GameState = JSON.parse(saved);
        setTeamNames({ red: state.redName, blue: state.blueName });
        setScores({ red: state.redScore, blue: state.blueScore });
        setCurrentTurn(state.currentTurn);
        setClickedBtns(new Set(state.clickedBtns));
        setMainBgId(state.mainBgId);
        setModalData(state.modalData);
      }
    }, 800);
    return () => clearInterval(interval);
  }, [roomId]);

  useEffect(() => {
    if (role === 'referee') {
      const state: GameState = {
        redName: teamNames.red,
        blueName: teamNames.blue,
        targetPoints: 350,
        redScore: scores.red,
        blueScore: scores.blue,
        currentTurn,
        clickedBtns: Array.from(clickedBtns),
        mainBgId,
        modalData
      };
      localStorage.setItem(`room_${roomId}`, JSON.stringify(state));
    }
  }, [teamNames, scores, currentTurn, clickedBtns, mainBgId, modalData, role, roomId]);

  const handleButtonClick = (id: string) => {
    if (role === 'spectator') return;
    if (clickedBtns.has(id)) return;
    setClickedBtns(prev => new Set(prev).add(id));
    const cardData = shuffledCards[clickedBtns.size % shuffledCards.length];
    const [imgName, attack, trap] = cardData as [string, number, number];
    let opponent: Team = currentTurn === 'red' ? 'blue' : 'red';
    let addedPoints = 0;
    if (attack > 0) {
      addedPoints = attack;
      setScores(prev => ({ ...prev, [opponent]: Math.max(0, prev[opponent] - addedPoints) }));
    } else if (trap > 0) {
      addedPoints = trap;
      setScores(prev => ({ ...prev, [currentTurn]: Math.max(0, prev[currentTurn] - addedPoints) }));
    }
    setModalData({ cardImg: cardBase + imgName, points: addedPoints, team: currentTurn });
    setCurrentTurn(prev => prev === 'red' ? 'blue' : 'red');
  };

  const closeCard = () => {
    if (role === 'spectator') return;
    setModalData(null);
  };

  const copySpectatorLink = () => {
    const link = `${window.location.origin}/game/${roomId}?role=spectator`;
    navigator.clipboard.writeText(link);
    alert('تم نسخ رابط المشاهدة! أرسله للمتابعين 👁️');
  };

  const renderBtnTable = (btn: { id: string, icon: string, color: string }, colSpan: number) => (
    <td
      key={btn.id}
      colSpan={colSpan}
      className={btn.color}
      onClick={() => handleButtonClick(btn.id)}
      style={{ padding: '0.2vmin', textAlign: 'center', verticalAlign: 'middle' }}
    >
      <img
        src={`${imgBase}${btn.icon}.png`}
        className="block hover:brightness-110 active:scale-95 transition-all mx-auto"
        style={{ width: '100%', height: 'auto', opacity: clickedBtns.has(btn.id) ? 0 : 1 }}
        alt={btn.icon}
        draggable={false}
      />
    </td>
  );

  return (
    <div className="w-full flex flex-col justify-center items-center font-[titri] p-4" dir="rtl">
      {role === 'referee' && (
        <div className="mb-4 flex gap-4">
          <button onClick={copySpectatorLink} className="bg-[#cdb035] px-6 py-2 rounded-xl text-black font-bold border border-white/20 shadow-lg active:scale-95 transition-all cursor-pointer">
            نسخ رابط المشاهدة 🔗
          </button>
          <div className="bg-red-600 px-6 py-2 rounded-xl text-white font-bold shadow-lg border border-white/20">
            أنت الحكم ⚖️ (كود: {roomId})
          </div>
        </div>
      )}
      {role === 'spectator' && (
        <div className="mb-4 bg-indigo-600 px-6 py-2 rounded-xl text-white font-bold shadow-lg animate-pulse border border-white/20">
          أنت تشاهد الآن مباشرة 📺
        </div>
      )}

      <div className="gameDiv">
        <table className="gameTable">
          <tbody>
            <tr>
              <td rowSpan={1} colSpan={2}></td>
              <td rowSpan={1} colSpan={33} onClick={() => role === 'referee' && setCurrentTurn('red')} className="cursor-pointer">
                <table className={`scoreTable score-red-bg ${currentTurn === 'red' ? 'active-turn-red' : 'inactive-turn'}`}>
                  <tbody>
                    <tr>
                      <td className="teamName">
                        <input className="w-full bg-transparent border-none text-white text-center outline-none" value={teamNames.red} onChange={e => role === 'referee' && setTeamNames(prev => ({ ...prev, red: e.target.value }))} readOnly={role !== 'referee'} />
                      </td>
                    </tr>
                    <tr>
                      <td className="teamScore">
                        <input type="number" className="w-full bg-transparent border-none text-white text-center outline-none font-bold" value={scores.red} onChange={e => role === 'referee' && setScores(prev => ({ ...prev, red: parseInt(e.target.value) || 0 }))} readOnly={role !== 'referee'} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td rowSpan={1} colSpan={50} style={{ position: 'relative', textAlign: 'center' }}>
                <img src={`/img/random/vs/${mainBgId}.png`} className="w-[40%] pt-[2.4vmin] cursor-pointer inline-block" onClick={changeMainImage} alt="VS" draggable={false} />
              </td>
              <td rowSpan={1} colSpan={33} onClick={() => role === 'referee' && setCurrentTurn('blue')} className="cursor-pointer">
                <table className={`scoreTable score-blue-bg ${currentTurn === 'blue' ? 'active-turn-blue' : 'inactive-turn'}`}>
                  <tbody>
                    <tr>
                      <td className="teamName">
                        <input className="w-full bg-transparent border-none text-white text-center outline-none" value={teamNames.blue} onChange={e => role === 'referee' && setTeamNames(prev => ({ ...prev, blue: e.target.value }))} readOnly={role !== 'referee'} />
                      </td>
                    </tr>
                    <tr>
                      <td className="teamScore">
                        <input type="number" className="w-full bg-transparent border-none text-white text-center outline-none font-bold" value={scores.blue} onChange={e => role === 'referee' && setScores(prev => ({ ...prev, blue: parseInt(e.target.value) || 0 }))} readOnly={role !== 'referee'} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td rowSpan={1} colSpan={2}></td>
            </tr>

            <tr>
              <td rowSpan={1} colSpan={2}></td>
              <td rowSpan={1} colSpan={33}></td>
              <td rowSpan={1} colSpan={50} style={{ position: 'relative', textAlign: 'center' }}>
                <img src="/img/settings.png" className="w-[18%] pt-[1vmin] cursor-pointer inline-block" alt="Settings" draggable={false} />
              </td>
              <td rowSpan={1} colSpan={33}></td>
              <td rowSpan={1} colSpan={2}></td>
            </tr>

            <tr>
              <td colSpan={1}></td>
              <td colSpan={12}>
                <table className="btnTable">
                  <tbody>
                    {rightCol1.map(btn => (
                      <tr key={btn.id}>{renderBtnTable(btn, 1)}</tr>
                    ))}
                  </tbody>
                </table>
              </td>
              <td colSpan={12}>
                <table className="btnTable">
                  <tbody>
                    {rightCol2.map(btn => (
                      <tr key={btn.id}>{renderBtnTable(btn, 1)}</tr>
                    ))}
                  </tbody>
                </table>
              </td>
              <td colSpan={3}></td>
              <td colSpan={64} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                {!modalData ? (
                  <img className="w-[90%] mx-auto rounded-[7%] cursor-pointer inline-block" onClick={changeMainImage} src={`/img/random/${mainBgId}.png`} alt="Main" draggable={false} />
                ) : (
                  <img
                    src={modalData.cardImg}
                    alt="Card"
                    draggable={false}
                    onClick={closeCard}
                    style={{ width: '100%', display: 'block', cursor: 'pointer', borderRadius: '4%' }}
                  />
                )}
              </td>
              <td colSpan={3}></td>
              <td colSpan={12}>
                <table className="btnTable">
                  <tbody>
                    {leftCol1.map(btn => (
                      <tr key={btn.id}>{renderBtnTable(btn, 1)}</tr>
                    ))}
                  </tbody>
                </table>
              </td>
              <td colSpan={12}>
                <table className="btnTable">
                  <tbody>
                    {leftCol2.map(btn => (
                      <tr key={btn.id}>{renderBtnTable(btn, 1)}</tr>
                    ))}
                  </tbody>
                </table>
              </td>
              <td colSpan={1}></td>
            </tr>

            <tr>
              <td colSpan={120}>
                <table className="btnTable2">
                  <tbody>
                    <tr>
                      {bottomRow1.map(btn => renderBtnTable(btn, 6))}
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td colSpan={120}>
                <table className="btnTable2">
                  <tbody>
                    <tr>
                      {bottomRow2.map(btn => renderBtnTable(btn, 6))}
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td colSpan={120}>
                <table className="btnTable2">
                  <tbody>
                    <tr>
                      {bottomRow3.map(btn => renderBtnTable(btn, 6))}
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/drum-war/create" element={<DrumWarSetup />} />
        <Route path="/game/:roomId" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
