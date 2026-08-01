import json, os
from statistics import mean
BASE=os.path.join(os.path.dirname(__file__),'..','data','certificates')
DATE='2026-08-02'

def item(y,a,p,r): return {'year':y,'applicants':a,'passed':p,'passRate':r}
def level(avg):
    if avg < 30: return '낮은 편'
    if avg < 50: return '보통 수준'
    return '높은 편'
def stats(label,url,written,practical,note='Q-Net 종목별 검정현황의 공식 공개 수치를 반영했습니다.'):
    wa=mean(x['passRate'] for x in written); pa=mean(x['passRate'] for x in practical)
    return {
      'enabled':True,'status':'available','title':'최근 시험 통계',
      'summary':f'필기시험 최근 평균 합격률은 {wa:.1f}%로 {level(wa)}입니다 · 실기시험 최근 평균 합격률은 {pa:.1f}%로 {level(pa)}입니다. 연도별 변동이 있으므로 최신 출제기준과 함께 확인하세요.',
      'groups':[
        {'id':'written','title':'필기시험','description':'연도별 필기시험 응시·합격 통계입니다.','items':written},
        {'id':'practical','title':'실기시험','description':'연도별 실기시험 응시·합격 통계입니다.','items':practical},
      ],
      'source':{'label':label,'url':url,'lastVerified':DATE},
      'analysis':['최근 평균 합격률은 입력된 공식 응시·합격 데이터에서 자동 계산됩니다.','응시자 수와 합격률은 시험 난이도와 출제기준에 따라 연도별로 달라질 수 있습니다.'],
      'notice':note
    }

data={
'hazardous-material-craftsman.json': stats('Q-Net 위험물기능사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gbnn=gbnSubtab2&id=crf00503&jmCd=6697', [item(2025,17438,6848,39.3)], [item(2025,8400,3914,46.6)]),
'civil-industrial-engineer.json': stats('Q-Net 토목산업기사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gbnn=gbnSubtab2&id=crf00503&jmCd=2240', [item(2025,1372,333,24.3)], [item(2025,439,256,58.3)]),
'automotive-maintenance-craftsman.json': stats('Q-Net 자동차정비기능사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=6281', [item(2025,15303,6560,42.9)], [item(2025,7883,5299,67.2)]),
'building-services-engineer.json': stats('Q-Net 건축설비기사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=1632&jmInfoDivCcd=B0', [item(2025,11151,6702,60.1)], [item(2025,9181,3302,36.0)]),
'automotive-maintenance-industrial-engineer.json': stats('Q-Net 자동차정비산업기사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gbnn=gbnSubtab2&id=crf00503&jmCd=2070&jmInfoDivCcd=B0', [item(2025,5974,2124,35.6)], [item(2025,2586,1311,50.7)]),
'interior-architecture-industrial-engineer.json': stats('Q-Net 실내건축산업기사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=2282&jmInfoDivCcd=B0', [item(2025,1851,569,30.7)], [item(2025,538,293,54.5)]),
'waste-treatment-engineer.json': stats('Q-Net 폐기물처리기사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=1950&jmInfoDivCcd=B0', [item(2025,2685,1215,45.3)], [item(2025,1660,599,36.1)]),
'construction-machinery-maintenance-industrial-engineer.json': stats('Q-Net 건설기계정비산업기사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=2050&jmInfoDivCcd=B0', [item(2025,659,194,29.4)], [item(2025,225,124,55.1)]),
'chemical-engineering-engineer.json': stats('Q-Net 화공기사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=1110&jmInfoDivCcd=B0', [item(2025,2705,640,23.7)], [item(2025,1350,345,25.6)]),
'electronics-engineer.json': stats('Q-Net 전자기사 종목별 검정현황','https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&gbnn=gbnSubtab2&id=crf00503&jmCd=1170&jmInfoDivCcd=B0', [item(2025,667,48,7.2)], [item(2025,39,12,30.8)]),
}
for fn,s in data.items():
    p=os.path.join(BASE,fn)
    if not os.path.exists(p): raise FileNotFoundError(p)
    with open(p,encoding='utf-8') as f: d=json.load(f)
    d['statistics']=s
    with open(p,'w',encoding='utf-8') as f: json.dump(d,f,ensure_ascii=False,indent=2); f.write('\n')
print('updated',len(data))
