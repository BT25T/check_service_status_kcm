import { useState } from 'react';
import { Search, Phone, Wrench, MessageCircle, Facebook } from 'lucide-react';
import { StatusTimeline } from './components/StatusTimeline';
import { getServiceTracking, type ServiceTrackingData } from '../api';
import logo from '../assets/logo.png';

export default function App() {
  const [serviceId, setServiceId] = useState('');
  const [telephone, setTelephone] = useState('');
  const [serviceData, setServiceData] = useState<ServiceTrackingData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setError('');
    setServiceData(null);

    if (!serviceId.trim() || !telephone.trim()) {
      setError('กรุณากรอกทั้ง เลขที่ใบงาน และเบอร์โทรศัพท์');
      return;
    }

    try {
      setLoading(true);
      const data = await getServiceTracking(serviceId, telephone);
      setServiceData(data);
    } catch (err: any) {
      setError(err.message || 'ไม่พบข้อมูลงานซ่อม');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Main Search / Status */}
          <div className="lg:col-span-2 bg-white/95 backdrop-blur rounded-2xl shadow-xl border border-white p-6 md:p-8">
            <h1 className="text-3xl text-center text-slate-800 mb-2">
              ตรวจสอบสถานะงานซ่อม
            </h1>
            <p className="text-center text-sm text-slate-500 mb-8">
              กรอกเลขที่ใบงานและเบอร์โทรศัพท์เพื่อค้นหาสถานะงานของคุณ
            </p>

            <div className="space-y-4 max-w-xl mx-auto">
              <div>
                <label htmlFor="serviceId" className="block text-sm text-slate-700 mb-2">
                  เลขที่ใบงาน
                </label>
                <input
                  id="serviceId"
                  type="text"
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="กรอกเลขที่ใบงาน"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="telephone" className="block text-sm text-slate-700 mb-2">
                  เบอร์โทรศัพท์
                </label>
                <input
                  id="telephone"
                  type="tel"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="กรอกเบอร์โทรศัพท์"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={handleSearch}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <Search className="w-5 h-5" />
                {loading ? 'กำลังค้นหา...' : 'ค้นหา'}
              </button>
            </div>

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl max-w-xl mx-auto">
                <p className="text-red-700 text-sm text-center">{error}</p>
              </div>
            )}

            {serviceData && (
              <div className="mt-8">
                <div className="border-t border-slate-200 pt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-center">
                      <p className="text-sm text-slate-500">เลขที่ใบงาน</p>
                      <p className="text-base text-slate-900 mt-1 font-medium">
                        {serviceData.service_id}
                      </p>
                    </div>
                    <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-center">
                      <p className="text-sm text-slate-500">เบอร์โทรศัพท์</p>
                      <p className="text-base text-slate-900 mt-1 font-medium">
                        {serviceData.cust_tel}
                      </p>
                    </div>
                  </div>

                  <StatusTimeline
                    statusCode={serviceData.service_status}
                    statusText={serviceData.service_status_full}
                    description={serviceData.service_memo}
                  />
                </div>
              </div>
            )}

            {!serviceData && !error && (
              <div className="mt-8 text-center text-sm text-slate-500">
                <p>กรอกเลขที่ใบงานและเบอร์โทรศัพท์เพื่อค้นหาสถานะงาน</p>
                <p className="mt-2 text-xs">
                  ต้องกรอกทั้งสองช่องจึงจะค้นหาได้
                </p>
              </div>
            )}
          </div>

          {/* Contact Sidebar */}
          <div className="bg-[#2C4A95] backdrop-blur rounded-2xl shadow-xl border border-white p-6">
            <div className="flex flex-col items-center text-center mb-3">
              <img
                src={logo}
                alt="Kingcom Logo"
                className="h-25 w-auto object-contain"
              />
              <h2 className="text-white text-xl font-semibold">
                ช่องทางการติดต่อ
              </h2>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-500">ฝ่ายประสานงาน</p>
                    <p className="text-slate-900 font-medium">045-643999</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start gap-3">
                  <Wrench className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-500">ฝ่ายช่าง</p>
                    <p className="text-slate-900 font-medium">086-4613191</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-500">ID Line</p>
                    <p className="text-slate-900 font-medium">@kingcom</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start gap-3">
                  <Facebook className="w-5 h-5 text-blue-700 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-500">Facebook</p>
                    <p className="text-slate-900 font-medium">คิงคอมพ์ ศรีสะเกษ</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-blue-50 border border-blue-100 p-4">
              <p className="text-sm text-blue-900 font-medium">หมายเหตุ</p>
              <p className="text-sm text-slate-600 mt-1">
                หากต้องการสอบถามรายละเอียดเพิ่มเติมเกี่ยวกับงานซ่อม
                กรุณาติดต่อทางร้านพร้อมแจ้งเลขที่ใบงาน
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}