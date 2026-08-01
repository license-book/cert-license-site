import json, os
from statistics import mean
BASE=os.path.join(os.path.dirname(__file__),'..','data','certificates')
DATE='2026-08-02'

def item(y,a,p,r=None):
    return {'year':y,'applicants':a,'passed':p,'passRate': round((p/a*100 if r is None else r),1)}

def level(avg):
    if avg < 30: return '낮은 편'
    if avg < 50: return '보통 수준'
    return '높은 편'

def stats(label,url,written,practical,note='Q-Net 종목별 검정현황 기준입니다.'):
    wa=mean(x['passRate'] for x in written); pa=mean(x['passRate'] for x in practical)
    return {
      'enabled': True, 'status':'available','title':'최근 시험 통계',
      'summary': f'필기시험 최근 평균 합격률은 {wa:.1f}%로 {level(wa)}입니다 · 실기시험 최근 평균 합격률은 {pa:.1f}%로 {level(pa)}입니다. 연도별 변동이 있으므로 최신 출제기준과 함께 확인하세요.',
      'groups':[
        {'id':'written','title':'필기시험','description':'연도별 필기시험 응시·합격 통계입니다.','items':written},
        {'id':'practical','title':'실기시험','description':'연도별 실기시험 응시·합격 통계입니다.','items':practical},
      ],
      'source':{'label':label,'url':url,'lastVerified':DATE},
      'analysis':['최근 평균 합격률은 입력된 연도별 응시·합격 데이터에서 자동 계산됩니다.','응시자 수와 합격률은 시험 난이도·출제기준 변경에 따라 연도별로 달라질 수 있습니다.'],
      'notice':note
    }

data={
'korean-cuisine-craftsman.json': stats('Q-Net 한식조리기능사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&id=crf00503s01&jmCd=7910&jmInfoDivCcd=A0',
 [item(2025,61122,24187,39.6)], [item(2025,38824,14251,36.7)], 'Q-Net 공개 통계 중 2025년 확인 수치를 반영했습니다.'),
'western-cuisine-craftsman.json': stats('Q-Net 양식조리기능사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&id=crf00503s01&jmCd=7911&jmInfoDivCcd=A308',
 [item(2025,30185,11850,39.3),item(2024,29695,11921,40.1),item(2023,30652,12880,42.0)],
 [item(2025,16701,6250,37.4),item(2024,16423,6359,38.7),item(2023,17010,6548,38.5)]),
'chinese-cuisine-craftsman.json': stats('Q-Net 중식조리기능사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&id=crf00503s01&jmCd=7913&jmInfoDivCcd=A0',
 [item(2025,13037,6415,49.2)], [item(2025,8458,3483,41.2)], 'Q-Net 공개 통계 중 2025년 확인 수치를 반영했습니다.'),
'japanese-cuisine-craftsman.json': stats('Q-Net 일식조리기능사 종목별 검정현황','https://q-net.or.kr/crf005.do?gId=&gSite=Q&id=crf00503s01&jmCd=7912&jmInfoDivCcd=A0',
 [item(2025,9766,5034,51.5),item(2024,9022,4796,53.2),item(2023,9194,5041,54.8)],
 [item(2025,5811,2188,37.7),item(2024,5369,2058,38.3),item(2023,5648,2050,36.3)]),
'confectionery-craftsman.json': stats('Q-Net 제과기능사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&id=crf00503s01&jmCd=7892&jmInfoDivCcd=A310',
 [item(2025,46965,15770,33.6),item(2024,48614,18046,37.1),item(2023,54894,21877,39.9)],
 [item(2025,24061,9780,40.6),item(2024,26641,10862,40.8),item(2023,30741,12839,41.8)]),
'bread-making-craftsman.json': stats('Q-Net 제빵기능사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&id=crf00503s01&jmCd=7893&jmInfoDivCcd=A0',
 [item(2025,47934,16076,33.5),item(2024,49084,18072,36.8),item(2023,51897,22178,42.7)],
 [item(2025,25502,12099,47.4),item(2024,27892,13048,46.8),item(2023,31450,14916,47.4)]),
'forklift-truck-operator-craftsman.json': stats('Q-Net 지게차운전기능사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&id=crf00503s01&jmCd=7875&jmInfoDivCcd=A0',
 [item(2025,110316,81152,73.6),item(2024,112929,84201,74.6),item(2023,110279,81156,73.6)],
 [item(2025,126757,60745,47.9),item(2024,128023,59924,46.8),item(2023,123766,58551,47.3)]),
'excavator-operator-craftsman.json': stats('Q-Net 굴착기운전기능사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=7862',
 [item(2025,34874,27645,79.3),item(2024,41582,32396,77.9),item(2023,45165,37347,82.7)],
 [item(2025,46923,17486,37.3),item(2024,55809,20573,36.9),item(2023,62522,23417,37.5)]),
'bartender-craftsman.json': stats('Q-Net 조주기능사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=7916&jmInfoDivCcd=A0',
 [item(2025,6535,4044,61.9)], [item(2025,5220,3518,67.4)], 'Q-Net 공개 통계 중 2025년 확인 수치를 반영했습니다.'),
'welding-craftsman.json': stats('Q-Net 피복아크용접기능사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=6223&jmInfoDivCcd=B0',
 [item(2025,11805,3565,30.2),item(2024,11593,3364,29.0)],
 [item(2025,5293,2342,44.2),item(2024,4942,2237,45.3)], '종목 명칭 개편에 따라 기존 프로젝트의 용접기능사 데이터에 피복아크용접기능사 공식 통계를 연결했습니다.'),
}
for fn,s in data.items():
    p=os.path.join(BASE,fn)
    if not os.path.exists(p): raise FileNotFoundError(p)
    with open(p,encoding='utf-8') as f: d=json.load(f)
    d['statistics']=s
    with open(p,'w',encoding='utf-8') as f: json.dump(d,f,ensure_ascii=False,indent=2); f.write('\n')
print('updated',len(data))
