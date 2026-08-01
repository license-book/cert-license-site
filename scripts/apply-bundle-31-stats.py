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
    return {'enabled':True,'status':'available','title':'최근 시험 통계',
      'summary':f'필기시험 최근 평균 합격률은 {wa:.1f}%로 {level(wa)}입니다 · 실기시험 최근 평균 합격률은 {pa:.1f}%로 {level(pa)}입니다. 연도별 변동이 있으므로 최신 출제기준과 함께 확인하세요.',
      'groups':[{'id':'written','title':'필기시험','description':'연도별 필기시험 응시·합격 통계입니다.','items':w},{'id':'practical','title':'실기시험','description':'연도별 실기시험 응시·합격 통계입니다.','items':p}],
      'source':{'label':label,'url':url,'lastVerified':DATE},
      'analysis':['최근 평균 합격률은 입력된 공식 응시·합격 데이터에서 자동 계산됩니다.','응시자 수와 합격률은 시험 난이도와 출제기준에 따라 연도별로 달라질 수 있습니다.'],
      'notice':'Q-Net 종목별 검정현황의 2025년 공식 공개 수치를 반영했습니다.'}
data={
'automotive-maintenance-engineer.json':stats('Q-Net 자동차정비기사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=1070&jmInfoDivCcd=B0',[item(2025,1063,198,18.6)],[item(2025,243,100,41.2)]),
'electronics-industrial-engineer.json':stats('Q-Net 전자산업기사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=2170&jmInfoDivCcd=B0',[item(2025,300,22,7.3)],[item(2025,13,7,53.8)]),
'metal-materials-industrial-engineer.json':stats('Q-Net 금속재료산업기사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=2101&jmInfoDivCcd=B0',[item(2025,831,356,42.8)],[item(2025,473,244,51.6)]),
'electrical-construction-industrial-engineer.json':stats('Q-Net 전기공사산업기사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=2150&jmInfoDivCcd=B0',[item(2025,2936,937,31.9)],[item(2025,1211,427,35.3)]),
'office-automation-industrial-engineer.json':stats('Q-Net 사무자동화산업기사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&id=crf00503s01&jmCd=2193&jmInfoDivCcd=A0',[item(2025,12480,7332,58.8)],[item(2025,7603,5546,72.9)]),
'energy-management-industrial-engineer.json':stats('Q-Net 에너지관리산업기사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=2960',[item(2025,3182,998,31.4)],[item(2025,1628,473,29.1)]),
'energy-management-engineer.json':stats('Q-Net 에너지관리기사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=1340',[item(2025,7704,2563,33.3)],[item(2025,5230,1756,33.6)]),
'metal-materials-engineer.json':stats('Q-Net 금속재료기사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=1104&jmInfoDivCcd=B0',[item(2025,686,275,40.1)],[item(2025,347,171,49.3)]),
'surveying-geospatial-information-industrial-engineer.json':stats('Q-Net 측량및지형공간정보산업기사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&id=crf00503s01&jmCd=2330&jmInfoDivCcd=A399',[item(2025,770,267,34.7)],[item(2025,335,229,68.4)]),
}
for fn,s in data.items():
 p=os.path.join(BASE,fn)
 if not os.path.exists(p): raise FileNotFoundError(p)
 with open(p,encoding='utf-8') as f:d=json.load(f)
 d['statistics']=s
 with open(p,'w',encoding='utf-8') as f:json.dump(d,f,ensure_ascii=False,indent=2);f.write('\n')
print('updated',len(data))
