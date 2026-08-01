import json, os
BASE=os.path.join(os.path.dirname(__file__),'..','data','certificates')
DATE='2026-08-02'
AUDIT={
'information-security-engineer.json':('KCA 자격검정통계','https://www.cq.or.kr/qh_cusgm12_001.do','한국방송통신전파진흥원(KCA) 공식 통계자료실에서 종목별 통계를 제공하지만, 현재 공개 화면의 동적 조회 결과를 정적 데이터로 교차 검증하지 못해 수치를 표시하지 않습니다.'),
'information-security-industrial-engineer.json':('KCA 자격검정통계','https://www.cq.or.kr/qh_cusgm12_001.do','한국방송통신전파진흥원(KCA) 공식 통계자료실에서 종목별 통계를 제공하지만, 현재 공개 화면의 동적 조회 결과를 정적 데이터로 교차 검증하지 못해 수치를 표시하지 않습니다.'),
'information-communication-engineer.json':('KCA 자격검정통계','https://www.cq.or.kr/qh_cusgm12_001.do','한국방송통신전파진흥원(KCA) 공식 통계자료실에서 종목별 통계를 제공하지만, 현재 공개 화면의 동적 조회 결과를 정적 데이터로 교차 검증하지 못해 수치를 표시하지 않습니다.'),
'information-communication-industrial-engineer.json':('KCA 자격검정통계','https://www.cq.or.kr/qh_cusgm12_001.do','한국방송통신전파진흥원(KCA) 공식 통계자료실에서 종목별 통계를 제공하지만, 현재 공개 화면의 동적 조회 결과를 정적 데이터로 교차 검증하지 못해 수치를 표시하지 않습니다.'),
'broadcast-communication-engineer.json':('KCA 자격검정통계','https://www.cq.or.kr/qh_cusgm12_001.do','한국방송통신전파진흥원(KCA) 공식 통계자료실에서 종목별 통계를 제공하지만, 현재 공개 화면의 동적 조회 결과를 정적 데이터로 교차 검증하지 못해 수치를 표시하지 않습니다.'),
'radio-electronic-communication-engineer.json':('KCA 자격검정통계','https://www.cq.or.kr/qh_cusgm12_001.do','한국방송통신전파진흥원(KCA) 공식 통계자료실에서 종목별 통계를 제공하지만, 현재 공개 화면의 동적 조회 결과를 정적 데이터로 교차 검증하지 못해 수치를 표시하지 않습니다.'),
'big-data-analysis-engineer.json':('데이터자격시험','https://www.dataq.or.kr/www/main.do','한국데이터산업진흥원 공식 시험사이트에서 시험을 운영하지만, 연도별 응시자·합격자 수를 공개 통계표 형태로 확인하지 못해 수치를 표시하지 않습니다.'),
'social-worker-level-1.json':('Q-Net 사회복지사 1급','https://www.q-net.or.kr/site/welfare','Q-Net 공식 사이트에 시험통계자료 메뉴가 있으나, 현재 종목 상세화면에서 연도별 응시·합격 수치를 일관된 표로 확인하지 못해 수치를 표시하지 않습니다.'),
'youth-counselor.json':('Q-Net 청소년상담사','https://www.q-net.or.kr/site/sangdamsa','청소년상담사는 1·2·3급 통계가 각각 공개되어 하나의 통합 자격증 페이지에 단일 합격률로 합산하면 오해가 생길 수 있어, 급수별 데이터 구조 확정 전까지 수치를 표시하지 않습니다.'),
'nursing-assistant.json':('한국보건의료인국가시험원','https://www.kuksiwon.or.kr','간호조무사 시험은 한국보건의료인국가시험원이 시행합니다. 공식 연도별 응시·합격 통계를 현재 데이터 구조에 맞게 교차 검증하지 못해 수치를 표시하지 않습니다.'),
'computerized-accounting-grade-1.json':('한국세무사회 자격시험','https://license.kacpta.or.kr','한국세무사회 시행 자격으로 공식 연도별 응시·합격 통계표를 확인하지 못해 수치를 표시하지 않습니다.'),
'computerized-accounting-grade-2.json':('한국세무사회 자격시험','https://license.kacpta.or.kr','한국세무사회 시행 자격으로 공식 연도별 응시·합격 통계표를 확인하지 못해 수치를 표시하지 않습니다.'),
'computerized-tax-grade-2.json':('한국세무사회 자격시험','https://license.kacpta.or.kr','한국세무사회 시행 자격으로 공식 연도별 응시·합격 통계표를 확인하지 못해 수치를 표시하지 않습니다.'),
'itq.json':('KPC 자격','https://license.kpc.or.kr','한국생산성본부 시행 자격으로 공식 연도별 응시·합격 통계표를 확인하지 못해 수치를 표시하지 않습니다.'),
'mos.json':('Microsoft Learn MOS','https://learn.microsoft.com/credentials/certifications/mos-certification/','MOS는 국제 벤더 자격으로 국내 전체 응시자·합격자에 대한 공식 연도별 통계가 공개되지 않아 수치를 표시하지 않습니다.'),
'mechanical-design-engineer.json':('Q-Net 국가자격 종목별 상세정보','https://www.q-net.or.kr/crf005.do?id=crf00503','기계설계기사 명칭으로 최신 독립 종목 통계를 확인하기 어렵고 종목 개편·변천 여부를 함께 검토해야 하므로, 다른 종목 통계를 임의 연결하지 않습니다.'),
}
for fn,(label,url,notice) in AUDIT.items():
    p=os.path.join(BASE,fn)
    if not os.path.exists(p): raise FileNotFoundError(p)
    with open(p,encoding='utf-8') as f:d=json.load(f)
    d['statistics']={
      'enabled':True,'status':'unavailable','title':'최근 시험 통계',
      'summary':'공식 출처를 확인했지만 현재 기준으로 검증 가능한 연도별 수치를 표시할 수 없습니다.',
      'groups':[],
      'source':{'label':label,'url':url,'lastVerified':DATE},
      'analysis':['확인되지 않은 합격률이나 민간 집계 수치는 사용하지 않습니다.','공식 연도별 통계가 검증되면 동일한 공통 차트 구조로 자동 표시됩니다.'],
      'notice':notice
    }
    with open(p,'w',encoding='utf-8') as f:json.dump(d,f,ensure_ascii=False,indent=2);f.write('\n')
print('audited',len(AUDIT))
