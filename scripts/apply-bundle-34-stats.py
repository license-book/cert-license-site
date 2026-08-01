import json, os
from statistics import mean
BASE=os.path.join(os.path.dirname(__file__),'..','data','certificates')
DATE='2026-08-02'
def item(y,a,p,r): return {'year':y,'applicants':a,'passed':p,'passRate':r}
def level(avg):
    if avg < 30: return '낮은 편'
    if avg < 50: return '보통 수준'
    return '높은 편'
def stats(label,url,w,p,notice):
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
      'notice':notice
    }

data={
'construction-machinery-maintenance-engineer.json':stats(
 'Q-Net 건설기계정비기사 종목별 검정현황',
 'https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=1050&jmInfoDivCcd=B0',
 [item(2025,105,10,9.5),item(2024,97,23,23.7),item(2023,75,17,22.7)],
 [item(2025,13,8,61.5),item(2024,11,5,45.5),item(2023,16,10,62.5)],
 'Q-Net 종목별 검정현황의 최근 3개 연도 공식 공개 수치를 반영했습니다.'),
'welding-engineer.json':stats(
 'Q-Net 용접기사 종목별 검정현황',
 'https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=1022&jmInfoDivCcd=B0',
 [item(2025,596,100,16.8),item(2024,630,137,21.7)],
 [item(2025,187,58,31.0),item(2024,215,64,29.8)],
 'Q-Net 종목별 검정현황의 최근 2개 연도 공식 공개 수치를 반영했습니다.'),
}
for fn,s in data.items():
    p=os.path.join(BASE,fn)
    if not os.path.exists(p): raise FileNotFoundError(p)
    with open(p,encoding='utf-8') as f:d=json.load(f)
    d['statistics']=s
    with open(p,'w',encoding='utf-8') as f:json.dump(d,f,ensure_ascii=False,indent=2);f.write('\n')
print('updated',len(data))
