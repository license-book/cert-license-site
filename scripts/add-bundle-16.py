import json, os, copy
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
CERT=ROOT/'data/certificates'
TODAY='2026-07-29'

def dump(p,d):
    p.parent.mkdir(parents=True,exist_ok=True)
    p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

def base_record(slug,name,license_type,category,code,subtitle,summary,elig_status='none',elig_label='응시자격 제한 없음',elig_summary='학력·경력·전공에 관계없이 응시할 수 있습니다.',written_subjects=None,practical_subjects=None,practical_format='작업형 실기시험',difficulty='중상',period='2~4개월',career_value='현장 직무에서 높음',recommended=None,reconsider=None,before=None,reality=None,career_fields=None,related=None,agency='한국산업인력공단',ministry='국토교통부'):
    url=f'https://www.q-net.or.kr/crf005.do?id=crf00503&jmCd={code}'
    is_engineer='기사' in license_type and '산업기사' not in license_type
    conds=[] if elig_status!='none' else [
        {'label':'학력','description':'제한 없음'},{'label':'전공','description':'제한 없음'},
        {'label':'경력','description':'제한 없음'},{'label':'연령','description':'별도 제한 없음'}]
    data={
      'basic':{'slug':slug,'name':name,'shortName':name,'type':'national','licenseType':license_type,'category':category,'agency':agency},
      'hero':{'title':name,'subtitle':subtitle,'image':f'/images/hero/{slug}.webp'},
      'certificateIntro':{'title':f'{name}는 어떤 자격증인가요?','description':summary,'highlights':[f'{ministry} 관련 국가기술자격',f'{agency} 시행','현장 안전·실무능력 평가']},
      'eligibility':{'title':f'{name} 응시자격은 어떻게 되나요?','status':elig_status,'statusLabel':elig_label,'summary':elig_summary,'conditions':conds,
        'commonQuestion':{'question':'시험 접수 전에 무엇을 확인해야 하나요?','answer':'Q-Net 최신 시험 공고에서 응시자격, 접수기간, 시험장, 준비물과 변경사항을 반드시 확인해야 합니다.'},
        'officialNotice':'세부 자격요건과 최신 운영 기준은 시행기관 공식 안내를 우선 확인하세요.'},
      'officialInfo':{'title':'시험 일정·접수·공식기관','summary':'시험 일정과 세부 운영사항은 시행기관 공고에 따라 달라질 수 있습니다.','organization':agency,'website':url,
        'items':[{'label':'시행기관','description':agency},{'label':'시험 일정','description':'Q-Net 연간 시험일정 및 회차별 공고 확인'},{'label':'원서접수','description':'Q-Net에서 기간 내 신청'},{'label':'최종 확인','description':'시험장·준비물·수험자 안내사항 확인'}],
        'importantNotice':['시험과목과 출제기준은 개정될 수 있으므로 최신 공고를 기준으로 준비하세요.','실기시험 준비물과 작업방법은 회차별 수험자 안내를 확인하세요.'],
        'buttons':[{'title':f'Q-Net {name}','url':url}]},
      'exam':{'title':f'{name} 시험은 어떻게 구성되나요?','written':{'title':'필기시험','subjects':written_subjects or [],'format':'객관식 4지 택일형 중심','passCriteria':'100점 만점에 60점 이상'},
        'practical':{'title':'실기시험','subjects':practical_subjects or [],'format':practical_format,'passCriteria':'100점 만점에 60점 이상'},'note':'시험시간, 세부 출제기준과 준비물은 Q-Net 최신 공고를 확인하세요.'},
      'statistics':{'enabled':False,'title':'연도별 시험 통계','summary':'정확한 최신 통계는 공식 통계 자료 확인 후 반영합니다.','groups':[],
        'source':{'label':f'Q-Net {name} 종목별 상세정보','url':url,'lastVerified':TODAY},'analysis':[],'notice':'미검증 수치를 임의로 표시하지 않으며 공식 자료 확인 후 업데이트합니다.'},
      'charts':{'examWeight':{'enabled':True,'items':[{'label':'이론·개념','value':30},{'label':'기출문제','value':30},{'label':'실무·실기','value':40}]}},
      'keyInfo':{'title':'한눈에 보는 핵심 정보','items':[{'label':'현실 난이도','value':difficulty},{'label':'평균 준비기간','value':period},{'label':'취업 활용도','value':career_value},{'label':'응시자격','value':elig_label}]},
      'realityGuide':{'title':'취득 전 현실 가이드','summary':f'{name}는 자격증 취득 자체보다 실제 장비·작업환경에 적응하고 안전수칙을 지키는 능력이 중요합니다.',
        'recommendedFor':recommended or [],'reconsiderIf':reconsider or [],'beforeStart':before or [],'realityPoints':reality or [],
        'firstStep':{'title':'처음 시작한다면','description':'Q-Net 최신 출제기준과 공개문제를 확인하고, 실제 시험장과 유사한 환경에서 기초 동작부터 연습하세요.'},
        'nextStep':{'title':'취득 후 다음 단계','description':'현장 경력을 쌓고 상위 등급 자격이나 관련 장비·품질·안전 분야로 확장하세요.'}},
      'cost':{'title':'준비 비용','summary':'공식 응시료 외에 교재, 강의, 장비 실습과 보호구 비용이 발생할 수 있습니다.','items':[{'label':'필기 응시료','value':'Q-Net 공식 접수 화면 확인','description':'접수 시 최신 금액 확인'},{'label':'실기 응시료','value':'Q-Net 공식 접수 화면 확인','description':'접수 시 최신 금액 확인'},{'label':'교재·강의','value':'선택','description':'기초 수준과 학습 방식에 따라 선택'},{'label':'실습환경','value':'종목별 상이','description':'장비·재료·보호구와 실습장 이용 비용이 발생할 수 있음'}]},
      'studyStrategy':{'title':'공부 전략','summary':f'{name}는 필기 기출 반복과 함께 실기 동작·작업순서·안전수칙을 충분히 연습해야 합니다.',
        'written':{'title':'필기 공부 전략','items':['최신 출제기준을 확인하고 과목별 핵심 개념을 정리합니다.','최근 기출문제를 반복해 빈출 개념과 법규를 익힙니다.','오답은 정답만 외우지 말고 관련 원리까지 확인합니다.','시험 직전에는 기출과 오답을 중심으로 마무리합니다.']},
        'practical':{'title':'실기 공부 전략','items':['시험장 장비와 작업 절차를 미리 확인합니다.','안전점검과 작업 전후 정리정돈을 습관화합니다.','제한시간 안에 동작과 작업을 반복합니다.','실수 원인을 기록하고 같은 조건에서 재연습합니다.']},
        'roadmap':[{'step':'STEP 1','title':'시험 구조 확인','description':'응시자격과 최신 출제기준을 확인합니다.'},{'step':'STEP 2','title':'핵심 이론 정리','description':'빈출 개념과 안전·법규를 익힙니다.'},{'step':'STEP 3','title':'기출 반복','description':'오답과 취약 유형을 중심으로 반복합니다.'},{'step':'STEP 4','title':'실기 집중','description':'실제 시험시간에 맞춰 작업을 반복합니다.'}],
        'periods':[{'level':'관련 경험이 있는 경우','period':'1~3개월','description':'기초 조작·작업 경험과 실습환경을 확보한 기준입니다.'},{'level':'처음 준비하는 경우','period':period,'description':'필기와 실기를 함께 준비하는 일반적 기준입니다.'}],
        'tips':['공식 출제기준과 공개문제를 기준으로 연습합니다.','안전수칙과 실격 기준을 실기 동작과 함께 익힙니다.'],
        'failures':['필기 합격 후에야 실기 연습을 시작합니다.','시험장 장비 특성과 실격 기준을 확인하지 않습니다.'],
        'checklist':['최신 시험 안내와 준비물을 확인했습니다.','최근 기출과 오답을 다시 점검했습니다.','시험시간에 맞춘 실전 연습을 했습니다.'],
        'resources':['Q-Net 공식 시험 안내와 출제기준','최근 기출문제와 공개문제'],'labookAdvice':f'{name}는 반복 연습과 안전수칙 준수가 합격과 현장 활용도를 함께 좌우합니다.'},
      'career':{'title':'취업·활용 분야','summary':f'{name}는 관련 현장과 장비 운용·정비·품질 직무에서 활용할 수 있습니다.','fields':career_fields or [],'benefits':['채용 우대와 자격수당 적용 여부는 기업·기관별 공고를 확인해야 합니다.','자격증과 함께 현장경험, 안전의식, 실무 숙련도를 갖추면 활용도가 높아집니다.']},
      'affiliate':{'lecture':'','book':'','application':''},
      'faq':[{'question':f'{name}는 비전공자도 준비할 수 있나요?','answer':'기능사 등급은 별도 응시자격 제한이 없지만, 기사 등급은 Q-Net 응시자격을 먼저 확인해야 합니다.'},{'question':'독학으로 취득할 수 있나요?','answer':'필기는 독학이 가능하지만 실기는 실제 장비와 안전한 실습환경이 필요하므로 교육기관이나 실습장을 병행하는 편이 현실적입니다.'},{'question':'취득 후 바로 취업할 수 있나요?','answer':'자격증은 지원 자격과 기초역량을 보여주는 수단이며, 실제 채용에서는 현장경험·안전의식·장비 적응력을 함께 평가합니다.'}],
      'related':related or [],
      'trustInfo':{'title':'정보 출처 및 업데이트','description':'라북은 시행기관의 공식 정보를 우선 확인하고, 변경 가능성이 있는 내용은 공식 공고 확인을 안내합니다.','organization':agency,'officialUrl':url,'lastUpdate':TODAY,'sourceLinks':[{'label':f'Q-Net {name}','url':url}],'sourceLabel':f'Q-Net {name}','sourceUrl':url,'lastVerified':TODAY,'lastUpdated':TODAY,'notice':'시험제도, 일정, 응시료, 실기 준비물은 변경될 수 있으므로 접수 전 공식 안내를 확인하세요.'},
      'finalCta':{'title':f'{name}, 준비를 시작하기 전에 공식 정보를 확인하세요','description':'시험일정·출제기준·실기 준비물을 확인한 뒤 현재 수준에 맞는 학습계획을 세우세요.','primary':{'label':f'Q-Net {name}','url':url},'secondary':{'label':'공부 전략 다시 보기','url':'#study'}},
      'seo':{'title':f'{name} 시험과목·난이도·실기·현실가이드 | 라북','description':f'{name}의 응시자격, 시험과목, 현실 난이도, 준비기간, 실기 준비방법과 취업 활용을 확인하세요.','keywords':[name,f'{name} 시험과목',f'{name} 실기',f'{name} 난이도',f'{name} 취업']},
      'update':{'version':'4.0.0','lastUpdated':TODAY,'lastVerified':TODAY,'verified':True,'note':'16차 자격증 묶음 신규 제작. Q-Net 공식 종목정보 기준으로 기본 시험정보와 현실가이드를 반영했습니다.'}
    }
    return data

records=[]
records.append(base_record('forklift-truck-operator-craftsman','지게차운전기능사','국가기술자격 기능사','운전·건설기계','7875','지게차의 안전점검·주행·화물 적재 및 운반 능력을 평가하는 국가기술자격입니다.','지게차운전기능사는 물류·제조·건설 현장에서 지게차를 안전하게 조종하고 화물을 적재·운반하는 능력을 평가합니다.',written_subjects=['지게차 주행','화물 적재','운반','하역','안전관리'],practical_subjects=['지게차운전 작업 및 도로주행'],difficulty='중',period='1~3개월',career_value='물류·제조 현장에서 높음',recommended=['물류센터·제조공장·건설현장 장비운전을 희망하는 사람','공간 감각과 반복 조작 연습에 익숙한 사람','안전수칙을 지키며 장비를 침착하게 다룰 수 있는 사람'],reconsider=['짧은 연습만으로 실기 합격이 가능하다고 생각하는 경우','장비 사각지대와 화물 전도 위험을 가볍게 보는 경우','현장 소음·먼지·야외근무 환경을 고려하지 않은 경우'],before=['Q-Net 공개문제와 실격 기준을 확인합니다.','실제 시험 규격과 유사한 지게차로 코스 연습을 확보합니다.','취득 후 건설기계조종사면허 발급 절차도 확인합니다.'],reality=['필기는 기출 중심으로 접근 가능하지만 실기는 코스 이탈·접촉·시간초과가 합격을 좌우합니다.','자격증 취득 후에도 실제 현장에서는 장비 기종과 화물 특성에 대한 적응이 필요합니다.','운전 자격과 별도로 현장 안전교육이나 사업장별 교육을 요구할 수 있습니다.'],career_fields=[{'title':'물류센터·창고','description':'입출고, 적재, 상하차와 재고 이동 업무에 활용합니다.'},{'title':'제조공장','description':'원자재와 완제품 이동, 생산라인 물류 업무에 활용합니다.'},{'title':'건설·유통 현장','description':'자재 운반과 상하차 장비운전 직무로 연결할 수 있습니다.'}],related=[{'slug':'excavator-operator-craftsman','name':'굴착기운전기능사','reason':'건설기계 조종 분야 연계'},{'slug':'crane-operator-craftsman','name':'기중기운전기능사','reason':'중장비 운전 분야 연계'},{'slug':'construction-machinery-maintenance-industrial-engineer','name':'건설기계정비산업기사','reason':'건설기계 정비 분야 연계'}]))
records.append(base_record('excavator-operator-craftsman','굴착기운전기능사','국가기술자격 기능사','운전·건설기계','7862','굴착기의 안전점검·주행·굴착 및 적재 작업 능력을 평가하는 국가기술자격입니다.','굴착기운전기능사는 건설·토목 현장에서 굴착기를 안전하게 조종하고 굴착·성토·적재 작업을 수행하는 능력을 평가합니다.',written_subjects=['굴착기 조종','점검 및 안전관리'],practical_subjects=['굴착기운전 작업'],difficulty='중상',period='1~3개월',career_value='건설·토목 현장에서 높음',recommended=['건설·토목 현장 장비운전을 희망하는 사람','레버 조작과 거리·깊이 감각을 반복 연습할 수 있는 사람','안전거리와 신호수 지시를 철저히 지킬 수 있는 사람'],reconsider=['실기 연습 장비와 시험장 환경을 확보하기 어려운 경우','장비 전도·충돌 위험과 현장 안전을 가볍게 보는 경우','자격증만으로 바로 숙련기사 수준의 일감을 기대하는 경우'],before=['Q-Net 최신 공개문제와 실격 기준을 확인합니다.','굴착·코스 주행을 실제 장비로 반복할 실습장을 확보합니다.','취득 후 건설기계조종사면허 발급 절차를 확인합니다.'],reality=['실기는 버킷 조작, 굴착 깊이·폭, 코스 주행과 시간 관리가 동시에 요구됩니다.','합격 후에도 현장에서는 토질·장비 규격·작업 반경에 대한 경험이 중요합니다.','초보자는 보조업무와 소형 장비부터 경험을 쌓는 경우가 많습니다.'],career_fields=[{'title':'토목·건설 현장','description':'굴착, 터파기, 상차와 정지 작업에 활용합니다.'},{'title':'관로·기반시설 공사','description':'상하수도, 전기·통신 관로와 기초 굴착 업무에 활용합니다.'},{'title':'건설기계 대여·운영','description':'장비 대여업체와 현장 장비운영 직무로 연결할 수 있습니다.'}],related=[{'slug':'forklift-truck-operator-craftsman','name':'지게차운전기능사','reason':'건설기계 조종 분야 연계'},{'slug':'crane-operator-craftsman','name':'기중기운전기능사','reason':'중장비 운전 분야 연계'},{'slug':'construction-machinery-equipment-engineer','name':'건설기계설비기사','reason':'건설기계 설비 분야 연계'}]))
records.append(base_record('crane-operator-craftsman','기중기운전기능사','국가기술자격 기능사','운전·건설기계','7861','기중기의 장비점검·주행·양중작업을 안전하게 수행하는 능력을 평가하는 국가기술자격입니다.','기중기운전기능사는 기계식 또는 유압식 기중기를 점검하고 안전하게 주행·양중·운반하는 조종능력을 평가합니다.',written_subjects=['건설기계기관','전기·섀시·기중기작업장치','유압일반','건설기계관리법규 및 도로통행방법','안전관리'],practical_subjects=['기중기운전작업 및 도로주행'],difficulty='상',period='2~4개월',career_value='건설·플랜트 양중 현장에서 높음',recommended=['건설·플랜트·항만 양중작업 분야를 목표로 하는 사람','하중 중심과 작업 반경을 침착하게 판단할 수 있는 사람','신호수와 협업하며 안전 절차를 철저히 지킬 수 있는 사람'],reconsider=['고소·중량물 작업의 위험성을 충분히 고려하지 않은 경우','기계식·유압식 장비 차이와 시험 유형을 확인하지 않은 경우','실제 기중기 연습 없이 영상만으로 실기를 준비하려는 경우'],before=['응시하려는 기계식 또는 유압식 시험 유형을 확인합니다.','Q-Net 공개문제와 실격·안전 기준을 확인합니다.','실제 장비로 인양·주행 동작을 반복할 실습장을 확보합니다.'],reality=['실기는 안전등급이 높은 작업형 시험으로 작은 조작 실수도 큰 감점이나 실격으로 이어질 수 있습니다.','취득 후 실제 현장에서는 장비 톤수, 작업계획, 신호체계와 경력에 따라 맡을 수 있는 업무가 달라집니다.','자격증 외에 건설기계조종사면허와 현장별 안전교육이 필요할 수 있습니다.'],career_fields=[{'title':'건설·토목 현장','description':'철골, 자재와 구조물의 양중·설치 작업에 활용합니다.'},{'title':'플랜트·조선·항만','description':'중량물 운반과 설비 설치 작업에 활용합니다.'},{'title':'장비 대여·운영업체','description':'기중기 조종과 장비관리 직무로 연결할 수 있습니다.'}],related=[{'slug':'forklift-truck-operator-craftsman','name':'지게차운전기능사','reason':'건설기계 운전 분야 연계'},{'slug':'excavator-operator-craftsman','name':'굴착기운전기능사','reason':'중장비 운전 분야 연계'},{'slug':'construction-machinery-maintenance-industrial-engineer','name':'건설기계정비산업기사','reason':'장비 정비 분야 연계'}]))
records.append(base_record('welding-engineer','용접기사','국가기술자격 기사','기계·금속','1022','용접공학·재료·시공·검사와 품질관리 전문능력을 평가하는 국가기술자격입니다.','용접기사는 용접설계, 재료와 야금, 공정관리, 결함분석 및 품질검사 능력을 평가하는 기사 등급 국가기술자격입니다.',elig_status='conditional',elig_label='기사 응시자격 필요',elig_summary='관련학과 대학 졸업(예정), 산업기사 취득 후 경력, 기능사 취득 후 경력, 동일·유사 직무분야 실무경력 등 기사 응시요건을 충족해야 합니다.',written_subjects=['기계제작법','재료역학','용접야금','용접구조설계','용접일반 및 안전관리'],practical_subjects=['용접 실무'],practical_format='필답형·작업형 등 Q-Net 최신 출제기준에 따른 실기평가',difficulty='상',period='4~8개월',career_value='조선·플랜트·제조 품질관리에서 높음',recommended=['조선·플랜트·압력용기·배관 분야의 용접기술·품질 직무를 목표로 하는 사람','용접공정과 재료·구조·검사 원리를 체계적으로 공부하려는 사람','현장 용접경력을 품질관리·감리·기술관리로 확장하려는 사람'],reconsider=['기사 응시자격을 아직 확인하지 않은 경우','재료역학과 용접야금 등 공학기초를 피하려는 경우','실무경험 없이 자격증만으로 고급 품질직무 진입이 보장된다고 기대하는 경우'],before=['Q-Net 응시자격과 최신 출제기준을 확인합니다.','재료역학·금속재료·용접공정 기초 수준을 진단합니다.','실기 방식과 작업 또는 필답 준비환경을 미리 확보합니다.'],reality=['필기는 용접공학뿐 아니라 역학·야금·설계 범위가 넓어 비전공자의 부담이 큽니다.','실기는 공정조건, 결함 원인, 검사와 품질기준을 실무적으로 설명하는 능력이 중요합니다.','취업 활용도는 높지만 현장경력, 국제규격 이해와 검사·품질 경험을 함께 요구하는 경우가 많습니다.'],career_fields=[{'title':'조선·해양·플랜트','description':'용접절차, 생산기술, 품질관리와 시공관리 업무에 활용합니다.'},{'title':'압력용기·배관·철구조물','description':'용접설계, 공정관리, 검사와 결함분석 업무에 활용합니다.'},{'title':'품질검사·기술지원','description':'비파괴검사 연계, 품질보증, 기술교육과 현장지원 업무로 확장할 수 있습니다.'}],related=[{'slug':'welding-craftsman','name':'용접기능사','reason':'용접 실무 기초 연계'},{'slug':'general-mechanical-engineer','name':'일반기계기사','reason':'기계공학 기반 연계'},{'slug':'industrial-safety-engineer','name':'산업안전기사','reason':'현장 안전관리 연계'}],ministry='고용노동부'))

for r in records:
    dump(CERT/f"{r['basic']['slug']}.json",r)

catalog_path=ROOT/'data/catalog/certificates.json'
catalog=json.loads(catalog_path.read_text(encoding='utf-8'))
for r in records:
    b=r['basic']; catalog[b['slug']]={'name':b['name'],'shortName':b['shortName'],'type':b['type'],'licenseType':b['licenseType'],'category':b['category'],'agency':b['agency'],'relatedTag':b['category']}
dump(catalog_path,catalog)

related_path=ROOT/'data/related/related-certificates.json'
rel=json.loads(related_path.read_text(encoding='utf-8'))
for r in records:
    rel[r['basic']['slug']]=[x['slug'] for x in r['related']]
dump(related_path,rel)

report=ROOT/'BUNDLE_16_REPORT.md'
report.write_text('# LABOOK 16차 작업 보고서\n\n- 055 지게차운전기능사\n- 056 굴착기운전기능사\n- 057 기중기운전기능사\n- 058 용접기사\n\n현실가이드, 시험정보, FAQ, SEO, Related 및 생성 데이터 반영.\n',encoding='utf-8')
