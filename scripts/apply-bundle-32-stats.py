import json, os
from statistics import mean
BASE=os.path.join(os.path.dirname(__file__),'..','data','certificates')
DATE='2026-08-02'

def item(y,a,p,r): return {'year':y,'applicants':a,'passed':p,'passRate':r}
def level(avg):
    if avg < 30: return '낮은 편'
    if avg < 50: return '보통 수준'
    return '높은 편'
def stats(label,url,w,p):
    wa=mean(x['passRate'] for x in w); pa=mean(x['passRate'] for x in p)
    return {
      'enabled':True,'status':'available','title':'최근 시험 통계',
      'summary':f'필기시험 최근 평균 합격률은 {wa:.1f}%로 {level(wa)}입니다 · 실기시험 최근 평균 합격률은 {pa:.1f}%로 {level(pa)}입니다. 연도별 변동이 있으므로 최신 출제기준과 함께 확인하세요.',
      'groups':[
        {'id':'written','title':'필기시험','description':'연도별 필기시험 응시·합격 통계입니다.','items':w},
        {'id':'practical','title':'실기시험','description':'연도별 실기시험 응시·합격 통계입니다.','items':p}
      ],
      'source':{'label':label,'url':url,'lastVerified':DATE},
      'analysis':['최근 평균 합격률은 입력된 공식 응시·합격 데이터에서 자동 계산됩니다.','응시자 수와 합격률은 시험 난이도와 출제기준에 따라 연도별로 달라질 수 있습니다.'],
      'notice':'Q-Net 종목별 검정현황의 2025년 공식 공개 수치를 반영했습니다.'
    }

data={
'industrial-safety-industrial-engineer.json':stats('Q-Net 산업안전산업기사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=2381&jmInfoDivCcd=B0',[item(2025,38295,14947,39.03)],[item(2025,18580,11259,60.6)]),
'gas-craftsman.json':stats('Q-Net 가스기능사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=6335&jmInfoDivCcd=B0',[item(2025,10692,2048,19.15)],[item(2025,3418,2323,67.96)]),
'air-conditioning-refrigeration-craftsman.json':stats('Q-Net 공조냉동기계기능사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=6320&jmInfoDivCcd=B0',[item(2025,6176,1712,27.72)],[item(2025,2654,1168,44.01)]),
'energy-management-craftsman.json':stats('Q-Net 에너지관리기능사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=7761&jmInfoDivCcd=B0',[item(2025,4499,1984,44.1)],[item(2025,2563,1525,59.5)]),
'general-mechanical-engineer.json':stats('Q-Net 일반기계기사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=1021&jmInfoDivCcd=B0',[item(2025,12608,3148,24.97)],[item(2025,4408,1944,44.1)]),
'interior-architecture-engineer.json':stats('Q-Net 실내건축기사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=1282&jmInfoDivCcd=B0',[item(2025,4056,2265,55.84)],[item(2025,2226,1233,55.39)]),
'surveying-geospatial-information-engineer.json':stats('Q-Net 측량및지형공간정보기사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=1380&jmInfoDivCcd=B0',[item(2025,2178,726,33.33)],[item(2025,1154,507,43.93)]),
'chemical-analysis-engineer.json':stats('Q-Net 화학분석기사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=1563&jmInfoDivCcd=B0',[item(2025,6157,1933,31.4)],[item(2025,3300,539,16.33)]),
'construction-machinery-equipment-engineer.json':stats('Q-Net 건설기계설비기사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=1040&jmInfoDivCcd=B0',[item(2025,1605,759,47.29)],[item(2025,1066,611,57.32)]),
'electronic-craftsman.json':stats('Q-Net 전자기능사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=6790&jmInfoDivCcd=B0',[item(2025,459,58,12.64)],[item(2025,2235,1776,79.46)]),
}
for fn,s in data.items():
    p=os.path.join(BASE,fn)
    if not os.path.exists(p): raise FileNotFoundError(p)
    with open(p,encoding='utf-8') as f:d=json.load(f)
    d['statistics']=s
    with open(p,'w',encoding='utf-8') as f:json.dump(d,f,ensure_ascii=False,indent=2);f.write('\n')
print('updated',len(data))
