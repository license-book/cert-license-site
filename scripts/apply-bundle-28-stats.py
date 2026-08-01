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

def stats(label,url,written,practical):
    wa=mean(x['passRate'] for x in written); pa=mean(x['passRate'] for x in practical)
    return {
      'enabled': True, 'status':'available','title':'최근 시험 통계',
      'summary': f'필기시험 최근 평균 합격률은 {wa:.1f}%로 {level(wa)}입니다 · 실기시험 최근 평균 합격률은 {pa:.1f}%로 {level(pa)}입니다. 연도별 변동이 있으므로 최신 출제기준과 함께 확인하세요.',
      'groups':[
        {'id':'written','title':'필기시험','description':'Q-Net 종목별 검정현황의 연도별 필기시험 통계입니다.','items':written},
        {'id':'practical','title':'실기시험','description':'Q-Net 종목별 검정현황의 연도별 실기시험 통계입니다.','items':practical},
      ],
      'source':{'label':label,'url':url,'lastVerified':DATE},
      'analysis':['최근 평균 합격률은 입력된 연도별 응시·합격 데이터에서 자동 계산됩니다.','응시자 수와 합격률은 시험 난이도·출제기준 변경에 따라 연도별로 달라질 수 있습니다.'],
      'notice':'응시·합격 수치는 Q-Net 종목별 검정현황 기준입니다.'
    }

data={
'air-conditioning-refrigeration-engineer.json': stats('Q-Net 공조냉동기계기사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=1730&jmInfoDivCcd=B0',
 [item(2024,9918,4347,43.8),item(2023,8757,3223,36.8),item(2022,6022,2051,34.1)],
 [item(2024,7092,1907,26.9),item(2023,4631,1908,41.2),item(2022,4288,1503,35.1)]),
'air-conditioning-refrigeration-industrial-engineer.json': stats('Q-Net 공조냉동기계산업기사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=2590&jmInfoDivCcd=B0',
 [item(2024,9188,2223,24.2),item(2023,10032,2341,23.3),item(2022,9698,2087,21.5)],
 [item(2024,3636,1765,48.5),item(2023,3282,1702,51.9),item(2022,3272,1990,60.8)]),
'electric-craftsman.json': stats('Q-Net 전기기능사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=7780&jmInfoDivCcd=B0',
 [item(2024,61127,22133,36.2),item(2023,60239,21017,34.9),item(2022,48440,16212,33.5)],
 [item(2024,32762,23769,72.6),item(2023,30545,22655,74.2),item(2022,27498,20053,72.9)]),
'fire-protection-mechanical-engineer.json': stats('Q-Net 소방설비기사(기계분야) 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=1900&jmInfoDivCcd=B0',
 [item(2024,20888,9662,46.3),item(2023,23350,10669,45.7),item(2022,17523,8206,46.8)],
 [item(2024,18587,4493,24.2),item(2023,20510,5458,26.6),item(2022,15080,2346,15.6)]),
'fire-protection-electrical-industrial-engineer.json': stats('Q-Net 소방설비산업기사(전기분야) 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=2910&jmInfoDivCcd=B0',
 [item(2024,7970,3197,40.1),item(2023,8281,3697,44.6),item(2022,7413,3451,46.6)],
 [item(2024,5437,1641,30.2),item(2023,4828,1373,28.4),item(2022,4244,1971,46.4)]),
'fire-protection-mechanical-industrial-engineer.json': stats('Q-Net 소방설비산업기사(기계분야) 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=2900&jmInfoDivCcd=B0',
 [item(2024,3688,1427,38.7),item(2023,4240,1717,40.5),item(2022,3587,1365,38.1)],
 [item(2024,1960,833,42.5),item(2023,2241,728,32.5),item(2022,1983,568,28.6)]),
'architectural-industrial-engineer.json': stats('Q-Net 건축산업기사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=2530&jmInfoDivCcd=B0',
 [item(2024,3502,1025,29.3),item(2023,4030,1137,28.2),item(2022,4016,1008,25.1)],
 [item(2024,1580,757,47.9),item(2023,2026,870,42.9),item(2022,1984,370,18.6)]),
'construction-safety-industrial-engineer.json': stats('Q-Net 건설안전산업기사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=2390&jmInfoDivCcd=B0',
 [item(2024,9392,2953,31.4),item(2023,10908,3831,35.1),item(2022,9134,3298,36.1)],
 [item(2024,4221,2052,48.6),item(2023,4509,3027,67.1),item(2022,4016,2299,57.3)]),
'air-pollution-environmental-engineer.json': stats('Q-Net 대기환경기사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=1661&jmInfoDivCcd=B0',
 [item(2024,9263,3856,41.6),item(2023,11252,4169,37.1),item(2022,11078,4105,37.1)],
 [item(2024,7961,3245,40.8),item(2023,9451,1667,17.6),item(2022,7220,2214,30.7)]),
'water-pollution-environmental-engineer.json': stats('Q-Net 수질환경기사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=1662&jmInfoDivCcd=B0',
 [item(2024,9002,2871,31.9),item(2023,8827,2610,29.6),item(2022,9089,2750,30.3)],
 [item(2024,5463,2073,38.0),item(2023,4897,1222,25.0),item(2022,4452,2249,50.5)]),
}
for fn,s in data.items():
    p=os.path.join(BASE,fn)
    with open(p,encoding='utf-8') as f: d=json.load(f)
    d['statistics']=s
    with open(p,'w',encoding='utf-8') as f: json.dump(d,f,ensure_ascii=False,indent=2); f.write('\n')
print('updated',len(data))
