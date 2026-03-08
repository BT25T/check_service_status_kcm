import {
  ClipboardList,
  Wrench,
  Package,
  CheckCircle2,
  Home,
  AlertCircle,
} from 'lucide-react';

interface StatusTimelineProps {
  statusCode: string;
  statusText: string;
  description: string;
}

interface StepItem {
  code: string;
  title: string;
  subtitle: string;
}

const steps: StepItem[] = [
  {
    code: 'Q',
    title: 'รอคิวงานซ่อม',
    subtitle: 'งานถูกบันทึกเข้าระบบและรอคิวตรวจซ่อม',
  },
  {
    code: 'R',
    title: 'กำลังซ่อม',
    subtitle: 'ช่างกำลังดำเนินการซ่อมอุปกรณ์',
  },
  {
    code: 'S',
    title: 'รออะไหล่',
    subtitle: 'กำลังรออะไหล่เพื่อดำเนินการต่อ',
  },
  {
    code: 'T',
    title: 'ซ่อมเสร็จแล้ว',
    subtitle: 'งานซ่อมเสร็จเรียบร้อยแล้ว',
  },
  {
    code: 'Z',
    title: 'รับกลับแล้ว',
    subtitle: 'ลูกค้ารับเครื่องกลับเรียบร้อย',
  },
];

export function StatusTimeline({
  statusCode,
  statusText,
  description,
}: StatusTimelineProps) {
  const currentCode = (statusCode || '').trim().toUpperCase();
  const currentIndex = steps.findIndex((s) => s.code === currentCode);

  const getStepState = (index: number) => {
    if (currentIndex === -1) return 'unknown';
    if (index < currentIndex) return 'done';
    if (index === currentIndex) return 'current';
    return 'upcoming';
  };

  const getIcon = (code: string, state: string) => {
    const iconClass =
      state === 'done'
        ? 'text-white'
        : state === 'current'
        ? 'text-blue-600'
        : 'text-gray-400';

    switch (code) {
      case 'Q':
        return <ClipboardList className={`w-5 h-5 ${iconClass}`} />;
      case 'R':
        return <Wrench className={`w-5 h-5 ${iconClass}`} />;
      case 'S':
        return <Package className={`w-5 h-5 ${iconClass}`} />;
      case 'T':
        return <CheckCircle2 className={`w-5 h-5 ${iconClass}`} />;
      case 'Z':
        return <Home className={`w-5 h-5 ${iconClass}`} />;
      default:
        return <AlertCircle className={`w-5 h-5 ${iconClass}`} />;
    }
  };

  const getCircleClass = (state: string) => {
    switch (state) {
      case 'done':
        return 'bg-green-600 border-green-600';
      case 'current':
        return 'bg-blue-50 border-blue-600';
      case 'upcoming':
        return 'bg-gray-50 border-gray-300';
      default:
        return 'bg-yellow-50 border-yellow-400';
    }
  };

  const getLineClass = (index: number) => {
    if (currentIndex === -1) return 'bg-gray-300';
    return index < currentIndex ? 'bg-green-600' : 'bg-gray-300';
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-sm text-gray-500">สถานะงานปัจจุบัน</p>
          <h3 className="text-2xl text-gray-900 mt-1">
            {statusText || statusCode || 'ไม่ทราบสถานะ'}
          </h3>
        </div>

        <div className="relative">
          {steps.map((step, index) => {
            const state = getStepState(index);

            return (
              <div key={step.code} className="flex gap-4 pb-8 last:pb-0">
                <div className="relative flex flex-col items-center">
                  <div
                    className={`z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 ${getCircleClass(
                      state
                    )}`}
                  >
                    {getIcon(step.code, state)}
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={`absolute top-12 h-full w-0.5 ${getLineClass(index)}`}
                    />
                  )}
                </div>

                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4
                      className={`text-lg ${
                        state === 'upcoming' ? 'text-gray-400' : 'text-gray-900'
                      }`}
                    >
                      {step.title}
                    </h4>

                    {state === 'current' && (
                      <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs text-blue-700">
                        ขั้นตอนปัจจุบัน
                      </span>
                    )}

                    {state === 'done' && (
                      <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs text-green-700">
                        เสร็จแล้ว
                      </span>
                    )}
                  </div>

                  <p
                    className={`mt-1 text-sm ${
                      state === 'upcoming' ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {step.subtitle}
                  </p>

                  {step.code === currentCode && (
                    <div className="mt-3 rounded-lg border border-blue-100 bg-blue-50 p-3">
                      <p className="text-sm text-gray-500">รายละเอียดการซ่อม</p>
                      <p className="mt-1 text-sm text-gray-800">
                        {description?.trim()
                          ? description
                          : 'ไม่มีรายละเอียดเพิ่มเติม'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {currentIndex === -1 && (
            <div className="mt-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
              <p className="text-sm text-yellow-800">
                ไม่พบสถานะนี้ใน timeline: {statusText || statusCode || '-'}
              </p>
              <p className="mt-1 text-sm text-yellow-700">
                {description?.trim() ? description : 'ไม่มีรายละเอียดเพิ่มเติม'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}