const BASE_URL = 'http://127.0.0.1:5000';

export interface ServiceTrackingData {
  service_id: string;
  cust_tel: string;
  service_status: string;
  service_status_full: string;
  service_memo: string;
}

export async function getServiceTracking(serviceId: string, custTel: string): Promise<ServiceTrackingData> {
  const params = new URLSearchParams({
    service_id: serviceId.trim(),
    cust_tel: custTel.trim(),
  });

  const res = await fetch(`${BASE_URL}/api/service-tracking?${params.toString()}`);
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error || 'โหลดข้อมูลไม่สำเร็จ');
  }

  return json.data;
}