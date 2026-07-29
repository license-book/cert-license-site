import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CERT = ROOT / 'data/certificates'
TODAY = '2026-07-29'


def dump(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


def make_record(*, slug, name, license_type, category, code, ministry, subtitle, intro,
                highlights, eligibility, exam, fees, difficulty, period, independent,
                key_risk, career_value, reality_summary, recommended, reconsider,
                before, reality_points, first_step, next_step, written_strategy,
                practical_strategy, roadmap, periods, tips, failures, career_summary,
                career_fields, faqs, related, keywords, chart_items, cost_extra):
    url = f'https://www.q-net.or.kr/crf005.do?id=crf00503&jmCd={code}'
    is_engineer = '기사' in license_type and '산업기사' not in license_type
    if is_engineer:
        eligibility_block = {
            'title': f'{name} 응시자격은 어떻게 되나요?',
            'status': 'conditional',
            'statusLabel': '기사 응시자격 필요',
            'summary': eligibility,
            'conditions': [
                {'label': '관련학과', 'description': '대학의 화학·화학공학·환경·생명과학 등 관련학과 기사 응시요건'},
                {'label': '산업기사+경력', 'description': '동일·유사 직무분야 산업기사 취득 후 실무경력 등'},
                {'label': '기능사+경력', 'description': '동일·유사 직무분야 기능사 취득 후 실무경력 등'},
                {'label': '실무경력', 'description': '동일·유사 직무분야 실무경력 등 기사 응시요건'},
            ],
            'commonQuestion': {
                'question': '내 전공이나 경력이 인정되는지 어떻게 확인하나요?',
                'answer': 'Q-Net 응시자격 자가진단에 학력·자격·경력을 입력하고, 애매한 경우 한국산업인력공단에 증빙서류 인정 여부를 확인하세요.'
            },
            'officialNotice': '응시자격 인정범위와 서류 제출기한은 개인별 학력·경력에 따라 다를 수 있으므로 접수 전 Q-Net 공식 안내를 확인하세요.'
        }
    else:
        eligibility_block = {
            'title': f'{name} 응시자격은 어떻게 되나요?',
            'status': 'none',
            'statusLabel': '응시자격 제한 없음',
            'summary': eligibility,
            'conditions': [
                {'label': '학력', 'description': '제한 없음'},
                {'label': '전공', 'description': '제한 없음'},
                {'label': '경력', 'description': '제한 없음'},
                {'label': '연령', 'description': '별도 제한 없음'},
            ],
            'commonQuestion': {
                'question': '조리 경험이 없어도 응시할 수 있나요?',
                'answer': '응시 자체에는 제한이 없지만, 실기는 정해진 시간 안에 여러 조리과정을 안전하고 위생적으로 수행해야 하므로 충분한 실습이 필요합니다.'
            },
            'officialNotice': '실기 과제, 준비물, 위생복장과 채점기준은 변경될 수 있으므로 접수 회차의 Q-Net 공개문제와 수험자 안내를 확인하세요.'
        }

    return {
        'basic': {'slug': slug, 'name': name, 'shortName': name, 'type': 'national', 'licenseType': license_type, 'category': category, 'agency': '한국산업인력공단'},
        'hero': {'title': name, 'subtitle': subtitle, 'image': f'/images/hero/{slug}.webp'},
        'certificateIntro': {'title': f'{name}는 어떤 자격증인가요?', 'description': intro, 'highlights': highlights},
        'eligibility': eligibility_block,
        'officialInfo': {
            'title': '시험 일정·접수·공식기관',
            'summary': '시험 일정과 세부 운영사항은 시행기관 공고에 따라 달라질 수 있습니다.',
            'organization': '한국산업인력공단',
            'website': url,
            'items': [
                {'label': '관련부처', 'description': ministry},
                {'label': '시행기관', 'description': '한국산업인력공단'},
                {'label': '시험 일정', 'description': 'Q-Net 연간 시험일정 및 종목별 시행 회차 확인'},
                {'label': '원서접수', 'description': 'Q-Net에서 접수기간 내 신청'},
                {'label': '응시료', 'description': f"필기 {fees['written']} / 실기 {fees['practical']} (접수 전 재확인)"},
            ],
            'importantNotice': [
                '현재 적용 출제기준과 회차별 수험자 안내를 최종 기준으로 확인하세요.',
                '시험장, 준비물, 허용도구와 실기 세부사항은 접수 회차 공지를 확인하세요.'
            ],
            'buttons': [{'title': f'Q-Net {name}', 'url': url}]
        },
        'exam': {
            'title': f'{name} 시험은 어떻게 구성되나요?',
            'written': exam['written'],
            'practical': exam['practical'],
            'note': '시험과목, 시험시간, 공개문제와 세부 출제범위는 Q-Net의 현재 적용 출제기준을 최종 기준으로 확인하세요.'
        },
        'statistics': {
            'enabled': False,
            'title': '연도별 시험 통계',
            'summary': '공식 통계 수치를 확인하기 전에는 임의의 합격률을 표시하지 않습니다.',
            'groups': [],
            'source': {'label': f'Q-Net {name} 종목별 상세정보', 'url': url, 'lastVerified': TODAY},
            'analysis': [],
            'notice': '최신 합격률은 Q-Net 자격검정통계에서 연도별로 확인하세요.'
        },
        'charts': {'examWeight': {'enabled': True, 'items': chart_items}},
        'keyInfo': {
            'title': '한눈에 보는 핵심 정보',
            'items': [
                {'label': '현실 난이도', 'value': difficulty, 'note': key_risk},
                {'label': '평균 준비기간', 'value': period, 'note': '기초 수준과 실습 가능 횟수에 따라 달라질 수 있습니다.'},
                {'label': '독학 적합도', 'value': independent, 'note': '실기는 실제 장비·재료 또는 기기 환경에서 반복 연습해야 합니다.'},
                {'label': '응시자격', 'value': eligibility_block['statusLabel'], 'note': '접수 전 공식 요건과 준비서류를 확인하세요.'},
                {'label': '핵심 탈락영역', 'value': key_risk, 'note': '기본원리와 작업 순서를 함께 익혀야 합니다.'},
                {'label': '취업 활용도', 'value': career_value, 'note': '자격 외에 현장경험과 직무 숙련도가 함께 요구됩니다.'},
            ]
        },
        'realityGuide': {
            'title': '취득 전 현실 가이드', 'summary': reality_summary,
            'recommendedFor': recommended, 'reconsiderIf': reconsider, 'beforeStart': before,
            'realityPoints': reality_points,
            'firstStep': {'title': '처음 시작한다면', 'description': first_step},
            'nextStep': {'title': '취득 후 다음 단계', 'description': next_step}
        },
        'cost': {
            'title': '준비 비용',
            'summary': '공식 응시료 외에 교재·강의·실습재료·장비 또는 기기 사용 비용이 발생할 수 있습니다.',
            'items': [
                {'label': '필기 응시료', 'value': fees['written'], 'description': 'Q-Net 공개 수수료 기준, 접수 전 재확인'},
                {'label': '실기 응시료', 'value': fees['practical'], 'description': 'Q-Net 공개 수수료 기준, 접수 전 재확인'},
                {'label': '교재·강의', 'value': '선택', 'description': '기초 수준과 학습 방식에 따라 선택'},
                cost_extra
            ],
            'savingTips': ['공식 출제기준과 공개문제를 먼저 확인해 불필요한 교재·재료 구매를 줄입니다.', '강의나 실습과정은 최신 출제기준과 실제 시험환경 반영 여부를 확인한 뒤 선택합니다.']
        },
        'studyStrategy': {
            'title': '공부 전략',
            'summary': f'{name}는 필기 개념을 기출문제로 정리하고 실기에서는 작업 순서·정확도·안전·시간관리를 동시에 완성해야 합니다.',
            'written': {'title': '필기 공부 전략', 'items': written_strategy, 'tip': '기출 정답만 외우지 말고 오답 선지의 근거와 관련 원리를 함께 확인하세요.'},
            'practical': {'title': '실기 공부 전략', 'items': practical_strategy, 'tip': '공개문제와 수험자 안내를 기준으로 실제 시험시간에 맞춘 전 과정을 반복하세요.'},
            'roadmap': roadmap, 'periods': periods, 'tips': tips, 'failures': failures,
            'checklist': ['Q-Net 응시자격과 최신 출제기준을 확인했습니다.', '필기 과목별 취약영역을 점검했습니다.', '실기 전 과정을 제한시간에 맞춰 반복했습니다.'],
            'resources': [f'Q-Net {name} 종목별 상세정보', 'Q-Net 적용 출제기준·공개문제·수험자 안내'],
            'labookAdvice': f'{name}는 합격 기준만 맞추는 연습보다 실수 원인을 기록하고 동일 조건에서 수정하는 반복이 중요합니다.'
        },
        'career': {'title': '취업·활용 분야', 'summary': career_summary, 'fields': career_fields, 'benefits': ['채용 우대, 자격수당, 법정 선임 또는 기술인력 인정 여부는 적용 법령과 기업·기관 공고를 확인해야 합니다.', '자격증과 함께 현장경험, 안전·위생의식, 기록과 의사소통 능력을 갖추면 활용도가 높아집니다.']},
        'affiliate': {'lecture': '', 'book': '', 'application': ''},
        'faq': faqs,
        'related': related,
        'trustInfo': {
            'title': '정보 출처 및 업데이트',
            'description': '라북은 시행기관의 공식 정보를 우선 확인하고, 변경 가능성이 있는 내용은 공식 공고 확인을 안내합니다.',
            'organization': '한국산업인력공단', 'officialUrl': url, 'lastUpdate': TODAY,
            'sourceLinks': [{'label': f'Q-Net {name}', 'url': url}],
            'sourceLabel': f'Q-Net {name}', 'sourceUrl': url, 'lastVerified': TODAY, 'lastUpdated': TODAY,
            'notice': '시험제도, 일정, 응시료, 실기 과제와 준비물은 변경될 수 있으므로 접수 전 공식 안내를 확인하세요.'
        },
        'finalCta': {
            'title': f'{name}, 시작 전에 공식 시험정보부터 확인하세요',
            'description': '시험일정·출제기준·공개문제·준비물을 확인한 뒤 현재 수준에 맞는 학습계획을 세우세요.',
            'primary': {'label': f'Q-Net {name}', 'url': url},
            'secondary': {'label': '공부 전략 다시 보기', 'url': '#study'}
        },
        'seo': {
            'title': f'{name} 시험과목·난이도·실기·현실가이드 | 라북',
            'description': f'{name}의 응시자격, 시험과목, 현실 난이도, 준비기간, 실기 준비방법과 취업 활용을 확인하세요.',
            'keywords': keywords
        },
        'update': {'version': '4.0.0', 'lastUpdated': TODAY, 'lastVerified': TODAY, 'verified': True, 'note': '19차 국가자격 데이터 신규 제작. Q-Net 공식 종목정보 기준으로 시험정보와 현실가이드를 반영했습니다.'}
    }

records = []
records.append(make_record(
    slug='chemical-analysis-engineer', name='화학분석기사', license_type='국가기술자격 기사', category='화학·바이오', code='1350', ministry='산업통상부',
    subtitle='시료 전처리, 화학·기기분석, 품질관리와 분석결과 해석 능력을 평가하는 국가기술자격입니다.',
    intro='화학분석기사는 원료·제품·환경 시료의 성분과 특성을 화학적·기기적 방법으로 분석하고, 시험법 검증과 품질관리를 수행할 전문인력을 평가하는 기사 자격입니다.',
    highlights=['화학·기기분석과 시료 전처리 종합평가', '시험·검사·품질관리·연구지원 직무 활용', '실기 작업형 기기·실험 안전과 정확도 중요'],
    eligibility='관련학과 대학 졸업(예정), 산업기사 취득 후 경력, 기능사 취득 후 경력, 동일·유사 직무분야 실무경력 등 기사 응시요건을 충족해야 합니다.',
    exam={
        'written': {'title':'필기시험','subjects':['화학분석 과정관리','화학물질 특성분석','화학물질 구조분석','시험법 밸리데이션','환경·안전관리'],'format':'객관식 4지 택일형, 과목당 20문항·30분','passCriteria':'과목당 40점 이상이면서 전과목 평균 60점 이상'},
        'practical': {'title':'실기시험','subjects':['화학분석 실무'],'format':'복합형 또는 작업형 중심 실기평가, 세부 시간·과제는 최신 공개문제 확인','passCriteria':'100점 만점에 60점 이상'}
    },
    fees={'written':'19,400원','practical':'62,900원'}, difficulty='상', period='4~8개월', independent='전공자 가능·비전공자는 실습 권장',
    key_risk='분석화학 계산·기기원리·실험정확도', career_value='시험·검사·품질관리 분야에서 높음',
    reality_summary='화학분석기사는 단순 암기시험이 아니라 농도·평형 계산, 분광·분리분석 원리, 시료 전처리와 실제 실험의 정확도·재현성을 함께 평가합니다.',
    recommended=['화학·생명·환경·소재 분야 시험분석·품질관리 직무를 목표로 하는 사람','실험실 안전수칙과 정밀한 기록·반복작업을 잘 지키는 사람','분석결과의 신뢰도와 오차원인을 논리적으로 설명하고 싶은 사람'],
    reconsider=['기사 응시자격을 확인하지 않은 경우','실험기기와 시약을 다루는 실습을 전혀 할 수 없는 경우','자격증만으로 연구직 취업이 보장된다고 기대하는 경우'],
    before=['현재 적용 출제기준과 실기 공개문제를 확인합니다.','몰·농도·산염기·평형·통계 기초를 진단합니다.','분광광도계·크로마토그래피 등 기기와 실험안전 실습환경을 확인합니다.'],
    reality_points=['필기는 분석화학 계산과 기기분석 원리를 연결하지 못하면 과락 위험이 큽니다.','실기는 시료 전처리, 표준용액 제조, 기기조작과 결과계산의 작은 오차가 누적됩니다.','취업에서는 자격 외에 GLP·GMP, 시험성적서 작성, 데이터 무결성과 품질시스템 이해가 중요합니다.'],
    first_step='몰·농도·희석과 산염기 평형을 복습한 뒤 최근 필기문제로 분석화학과 기기분석 취약도를 확인하세요.',
    next_step='품질경영기사, 위험물·환경 분야 자격 또는 시험분석·품질보증·연구지원 경력으로 확장할 수 있습니다.',
    written_strategy=['몰농도·희석·적정·평형 계산을 단위와 유효숫자까지 반복합니다.','분광·전기화학·크로마토그래피는 원리-기기구성-오차원인을 표로 연결합니다.','밸리데이션은 정확성·정밀성·직선성·검출한계 개념을 사례와 함께 정리합니다.','환경·안전관리는 시약 취급, 폐기, 보호구와 실험실 위험요인을 기출로 확인합니다.'],
    practical_strategy=['표준용액 제조와 희석은 계산-칭량-표선맞춤-라벨링 순서를 고정합니다.','기기분석은 검량선, 블랭크, 시료 측정과 결과계산을 한 세트로 반복합니다.','오염·피펫팅·기포·영점조정 등 오차원인을 체크리스트로 관리합니다.','실제 제한시간에 맞춰 실험기록과 계산과정을 읽기 쉽게 작성합니다.'],
    roadmap=[{'step':'STEP 1','title':'응시자격·기초 진단','description':'응시요건과 분석화학 기초를 확인합니다.'},{'step':'STEP 2','title':'분석·기기 원리 정리','description':'화학분석과 기기분석 핵심원리를 연결합니다.'},{'step':'STEP 3','title':'기출·계산 반복','description':'과락영역과 계산실수를 집중 보완합니다.'},{'step':'STEP 4','title':'실기 전 과정 완성','description':'전처리·측정·계산·기록을 제한시간에 반복합니다.'}],
    periods=[{'level':'관련 전공·실험 경험 있음','period':'3~5개월','description':'분석화학과 기기 사용 경험을 시험형 답안으로 전환하는 기준입니다.'},{'level':'비전공·실험 경험 부족','period':'5~8개월','description':'화학기초와 실습환경을 함께 확보하는 기준입니다.'}],
    tips=['모든 계산에 단위, 희석배수와 유효숫자를 표시합니다.','실기에서는 결과값만 아니라 시료명·표준액·기기조건과 작업순서를 정확히 기록합니다.'],
    failures=['기기분석 용어만 암기하고 검량선·농도계산을 충분히 연습하지 않습니다.','필기 합격 후에야 실험기기와 작업형 준비를 시작합니다.'],
    career_summary='화학·제약·식품·환경·소재 산업의 시험분석, 품질관리, 연구개발 지원과 공인시험기관 분야에서 활용됩니다.',
    career_fields=[{'title':'시험·검사기관','description':'원료·제품·환경시료의 성분분석, 시험성적서와 품질문서 작성에 활용합니다.'},{'title':'제조업 품질관리','description':'화학·제약·식품·소재 공정의 원료검사, 공정검사와 제품출하검사에 활용합니다.'},{'title':'연구개발·환경분석','description':'분석법 개발, 기기운영, 데이터 해석과 연구·환경측정 지원 업무로 연결할 수 있습니다.'}],
    faqs=[{'question':'화학분석기사는 비전공자도 준비할 수 있나요?','answer':'기사 응시자격을 충족하면 가능하지만 일반화학·분석화학·기기분석과 실험기초를 처음부터 익혀야 하므로 준비기간이 길어질 수 있습니다.'},{'question':'화공기사와 무엇이 다른가요?','answer':'화공기사는 생산공정·반응·분리·제어가 중심이고, 화학분석기사는 시료의 정성·정량분석, 기기분석과 시험품질관리가 중심입니다.'},{'question':'실기 독학이 가능한가요?','answer':'이론과 계산은 독학할 수 있지만 실제 기기조작과 시료 전처리를 평가할 수 있어 실습 가능한 교육기관이나 장비환경을 확보하는 편이 현실적입니다.'},{'question':'취업에 가장 도움이 되는 분야는 어디인가요?','answer':'시험검사기관, 화학·제약·식품·환경·소재 제조업의 품질관리와 분석업무에서 직접적으로 활용되며 채용조건은 공고별로 확인해야 합니다.'}],
    related=[{'slug':'chemical-engineering-engineer','name':'화공기사','reason':'화학공정·생산기술 분야 연계'},{'slug':'water-pollution-environmental-engineer','name':'수질환경기사','reason':'환경시료 분석 분야 연계'},{'slug':'air-pollution-environmental-engineer','name':'대기환경기사','reason':'환경측정·분석 분야 연계'}],
    keywords=['화학분석기사','화학분석기사 시험과목','화학분석기사 실기','화학분석기사 난이도','화학분석기사 취업'],
    chart_items=[{'label':'분석화학·계산','value':30},{'label':'기기분석','value':30},{'label':'품질·안전','value':15},{'label':'실기·실험','value':25}],
    cost_extra={'label':'실기 준비','value':'중간~높음','description':'시약·초자·기기 사용과 실습과정 비용이 발생할 수 있음'}
))

cook_specs = [
    ('korean-cuisine-craftsman','한식조리기능사','7910','한식','한식 재료관리와 음식조리 및 위생관리','한식조리 실무','26,900원','한식 조리과정과 칼질·불조절·위생관리 능력을 평가하는 국가기술자격입니다.','밥·국·찌개·전·구이·찜·생채 등 한식 조리 직무','한식 식당·급식·외식조리 분야에서 높음',
     ['한식 조리사·급식조리원 취업을 준비하는 사람','칼질과 계량, 불조절을 반복 연습할 수 있는 사람','위생복장과 작업대 정리를 습관처럼 지킬 수 있는 사람'],
     ['공개과제별 실습 없이 레시피 암기만 하려는 경우','칼 사용과 화기·기름 작업에 대한 안전수칙을 가볍게 보는 경우','자격증만으로 숙련 조리사 수준의 채용을 기대하는 경우'],
     ['현재 공개과제와 지급재료·준비물을 확인합니다.','채썰기·다지기·돌려깎기 등 기본 칼질 수준을 진단합니다.','시험과 유사한 조리대와 화구에서 전 과정 실습을 확보합니다.'],
     ['실기는 맛뿐 아니라 규격, 익힘, 담음새, 위생과 시간관리를 함께 평가합니다.','과제마다 요구되는 썰기 크기와 조리순서가 달라 반복실습이 필요합니다.','취업 후에는 대량조리, 원가·재고관리와 현장속도에 다시 적응해야 합니다.'],
     [{'title':'한식당·외식업','description':'전처리, 반찬·국·구이·전 등 한식 메뉴 조리업무에 활용합니다.'},{'title':'학교·병원·사업체 급식','description':'위생기준에 따른 대량조리와 배식 준비 직무로 연결할 수 있습니다.'},{'title':'창업·조리보조','description':'한식 메뉴 개발, 주방보조와 소규모 외식업 운영의 기초역량으로 활용합니다.'}],
     [{'slug':'western-cuisine-craftsman','name':'양식조리기능사','reason':'외식조리 분야 확장'},{'slug':'chinese-cuisine-craftsman','name':'중식조리기능사','reason':'조리기능사 종목 연계'},{'slug':'energy-management-craftsman','name':'에너지관리기능사','reason':'급식·시설 현장 자격 확장'}]),
    ('western-cuisine-craftsman','양식조리기능사','7911','양식','양식 재료관리와 음식조리 및 위생관리','양식조리 실무','29,600원','서양식 소스·수프·전채·육류·생선·달걀요리와 위생관리 능력을 평가하는 국가기술자격입니다.','소스·수프·샐러드·육류·생선·달걀요리 등 양식 조리 직무','호텔·레스토랑·외식조리 분야에서 높음',
     ['호텔·레스토랑·브런치·외식조리 직무를 목표로 하는 사람','계량과 소스 농도, 익힘 정도를 섬세하게 맞출 수 있는 사람','서양식 조리용어와 기본 조리법을 체계적으로 익히려는 사람'],
     ['소스와 육류·생선 익힘을 실제로 반복할 환경이 없는 경우','계량·온도·시간을 감으로만 처리하려는 경우','자격증만으로 호텔 취업이 보장된다고 기대하는 경우'],
     ['현재 공개과제와 지급재료·준비물을 확인합니다.','칼질·팬조작·소스 농도와 달걀 조리 기본기를 진단합니다.','시험과 유사한 화구와 조리기구로 실전연습을 확보합니다.'],
     ['양식 실기는 소스의 농도·색·분리 여부와 재료의 정확한 익힘이 점수에 크게 영향을 줍니다.','과제별 조리용어와 요구형태를 이해하지 못하면 완성품 규격이 어긋날 수 있습니다.','취업에서는 자격 외에 서비스 속도, 플레이팅, 주방협업과 메뉴경험이 중요합니다.'],
     [{'title':'호텔·레스토랑','description':'수프·소스·육류·생선·달걀요리와 코스메뉴 조리업무에 활용합니다.'},{'title':'브런치·카페·외식업','description':'샌드위치, 샐러드, 파스타와 서양식 메뉴 조리기초로 활용합니다.'},{'title':'급식·케이터링','description':'서양식 메뉴 전처리, 조리와 대량생산 보조업무로 연결할 수 있습니다.'}],
     [{'slug':'korean-cuisine-craftsman','name':'한식조리기능사','reason':'조리기능사 기본 종목 연계'},{'slug':'chinese-cuisine-craftsman','name':'중식조리기능사','reason':'외식조리 분야 확장'},{'slug':'energy-management-craftsman','name':'에너지관리기능사','reason':'주방·시설 분야 연계'}]),
    ('chinese-cuisine-craftsman','중식조리기능사','7912','중식','중식 재료관리와 음식조리 및 위생관리','중식조리 실무','28,500원','센 불과 웍을 활용한 볶음·튀김·탕·냉채 등 중식 조리와 위생관리 능력을 평가하는 국가기술자격입니다.','볶음·튀김·탕·면·냉채 등 중식 조리 직무','중식당·호텔·외식조리 분야에서 높음',
     ['중식당·호텔·외식주방 조리직을 목표로 하는 사람','센 불, 웍과 튀김작업을 안전하게 반복 연습할 수 있는 사람','빠른 손질과 조리순서를 정확히 익히려는 사람'],
     ['웍·튀김·화기 작업의 안전위험을 가볍게 보는 경우','실제 화력과 조리도구 없이 영상만으로 실기를 준비하려는 경우','자격증만으로 즉시 중식 숙련조리사가 될 수 있다고 생각하는 경우'],
     ['현재 공개과제와 지급재료·준비물을 확인합니다.','채썰기·편썰기·다지기와 전분물·튀김온도 기본기를 점검합니다.','시험과 유사한 웍·화구에서 실전연습을 확보합니다.'],
     ['중식 실기는 재료손질과 조리속도가 빠르고 화력·기름온도·전분농도 조절이 핵심입니다.','튀김과 웍 조작 중 안전·위생·정리정돈이 무너지면 완성도와 채점 모두에 영향을 줍니다.','취업 후에는 실제 주문속도, 대량전처리와 주방협업 경험이 중요합니다.'],
     [{'title':'중식당·호텔','description':'볶음·튀김·탕·냉채 등 중식 메뉴의 전처리와 조리업무에 활용합니다.'},{'title':'외식업·급식','description':'중식 메뉴 조리보조, 대량조리와 배식 준비 직무로 연결할 수 있습니다.'},{'title':'창업·메뉴개발','description':'소규모 중식 외식업과 메뉴개발의 기초 조리역량으로 활용합니다.'}],
     [{'slug':'korean-cuisine-craftsman','name':'한식조리기능사','reason':'조리기능사 기본 종목 연계'},{'slug':'western-cuisine-craftsman','name':'양식조리기능사','reason':'외식조리 분야 확장'},{'slug':'energy-management-craftsman','name':'에너지관리기능사','reason':'주방·시설 분야 연계'}])
]

for slug,name,code,cuisine,written_subj,practical_subj,practical_fee,subtitle,career_focus,career_value,recommended,reconsider,before,reality_points,career_fields,related in cook_specs:
    records.append(make_record(
        slug=slug, name=name, license_type='국가기술자격 기능사', category='조리·외식', code=code, ministry='식품의약품안전처',
        subtitle=subtitle,
        intro=f'{name}는 {career_focus}에 필요한 재료관리, 조리기술, 위생·안전과 완성품 품질을 평가하는 기능사 자격입니다.',
        highlights=[f'{cuisine} 재료관리·조리·위생 종합평가','응시자격 제한 없이 도전 가능','실기 공개과제·작업순서·위생관리 중요'],
        eligibility='학력·전공·경력에 관계없이 누구나 응시할 수 있습니다.',
        exam={
            'written': {'title':'필기시험','subjects':[written_subj],'format':'객관식 4지 택일형 60문항, 60분','passCriteria':'100점 만점에 60점 이상'},
            'practical': {'title':'실기시험','subjects':[practical_subj],'format':'작업형 조리시험, 과제별 시험시간은 최신 공개문제 확인','passCriteria':'100점 만점에 60점 이상'}
        },
        fees={'written':'14,500원','practical':practical_fee}, difficulty='중상', period='2~4개월', independent='필기 가능·실기는 반복실습 필수',
        key_risk='위생·시간초과·규격·익힘·작업순서', career_value=career_value,
        reality_summary=f'{name} 실기는 레시피 암기만으로 통과하기 어렵고, 제한시간 안에 재료손질·조리·담음새·위생·안전을 동시에 맞춰야 하는 작업형 시험입니다.',
        recommended=recommended, reconsider=reconsider, before=before, reality_points=reality_points,
        first_step='최신 공개과제 목록을 확인하고 칼질·계량·위생복장·작업대 정리부터 익힌 뒤 쉬운 과제를 반복하세요.',
        next_step='다른 조리기능사 종목, 조리산업기사 또는 외식·급식·호텔 주방 경력으로 확장할 수 있습니다.',
        written_strategy=['식품위생·개인위생·교차오염과 식중독 예방을 우선 정리합니다.','재료의 특성, 저장·전처리와 조리원리를 기출문제에 연결합니다.','계량, 조리온도, 조리시간과 안전관리의 빈출 개념을 반복합니다.','최근 기출을 제한시간에 풀어 60점 이상을 안정적으로 유지합니다.'],
        practical_strategy=['과제마다 요구되는 재료 규격과 완성형태를 먼저 암기합니다.','손질-가열-간맞춤-담기-정리 순서를 고정해 동선을 줄입니다.','위생복장, 손씻기, 칼·도마 구분, 폐기물 처리와 작업대 정리를 습관화합니다.','전체 과정을 실제 시험시간보다 약간 짧게 반복해 돌발 실수에 대비합니다.'],
        roadmap=[{'step':'STEP 1','title':'공개과제·기초 확인','description':'과제, 준비물, 칼질과 위생기준을 확인합니다.'},{'step':'STEP 2','title':'필기·기본기 완성','description':'위생·재료·조리원리와 기본동작을 익힙니다.'},{'step':'STEP 3','title':'과제별 반복','description':'각 과제의 규격·순서·시간을 고정합니다.'},{'step':'STEP 4','title':'실전 모의시험','description':'무작위 과제를 시험시간에 맞춰 완성합니다.'}],
        periods=[{'level':'조리 경험·실습환경 있음','period':'1~2개월','description':'기본 칼질과 화구 사용에 익숙한 기준입니다.'},{'level':'조리 초보·처음 준비','period':'2~4개월','description':'기본기와 공개과제를 순차적으로 반복하는 기준입니다.'}],
        tips=['과제마다 시작 전 1분 동안 작업순서와 동선을 머릿속으로 확인합니다.','맛을 고치느라 시간을 잃기보다 규격·익힘·위생과 제출시간을 우선 관리합니다.'],
        failures=['레시피만 외우고 실제 재료로 전 과정을 반복하지 않습니다.','조리 완성에만 집중해 위생·정리정돈·제출시간을 놓칩니다.'],
        career_summary=f'{career_focus}에서 활용되며, 자격 취득 후에도 현장속도·대량조리·원가관리와 주방협업 경험을 쌓아야 합니다.',
        career_fields=career_fields,
        faqs=[{'question':f'{name}는 요리 초보도 취득할 수 있나요?','answer':'응시자격 제한은 없지만 실기는 칼질과 화구 사용, 위생관리, 시간배분을 동시에 평가하므로 초보자는 기본동작부터 충분히 반복해야 합니다.'},{'question':'필기는 기출문제만 풀어도 되나요?','answer':'기출 반복이 효과적이지만 위생·식중독·재료관리와 조리원리를 이해해야 변형문제와 실기에도 도움이 됩니다.'},{'question':'실기학원을 꼭 다녀야 하나요?','answer':'필수는 아니지만 시험과 유사한 조리대·화구·도구와 객관적인 피드백을 확보하기 어려우면 실습학원이나 교육과정을 병행하는 편이 효율적입니다.'},{'question':'자격증만 있으면 조리사로 취업할 수 있나요?','answer':'지원 자격이나 우대요건에는 도움이 되지만 실제 채용에서는 조리속도, 위생, 경력, 근무시간 적응과 팀워크를 함께 평가합니다.'}],
        related=related,
        keywords=[name,f'{name} 시험과목',f'{name} 실기',f'{name} 공개문제',f'{name} 난이도',f'{name} 취업'],
        chart_items=[{'label':'위생·재료관리','value':25},{'label':'기본 칼질·전처리','value':25},{'label':'조리·불조절','value':30},{'label':'시간·담음새','value':20}],
        cost_extra={'label':'실기 재료·실습','value':'중간','description':'반복실습용 식재료, 조리도구와 실습장 비용이 발생할 수 있음'}
    ))

for record in records:
    dump(CERT / f"{record['basic']['slug']}.json", record)

catalog_path = ROOT / 'data/catalog/certificates.json'
catalog = json.loads(catalog_path.read_text(encoding='utf-8'))
for record in records:
    b = record['basic']
    catalog[b['slug']] = {'name':b['name'],'shortName':b['shortName'],'type':b['type'],'licenseType':b['licenseType'],'category':b['category'],'agency':b['agency'],'relatedTag':b['category']}
dump(catalog_path, catalog)

related_path = ROOT / 'data/related/related-certificates.json'
related_map = json.loads(related_path.read_text(encoding='utf-8'))
for record in records:
    related_map[record['basic']['slug']] = [item['slug'] for item in record['related']]
dump(related_path, related_map)

report = ROOT / 'BUNDLE_19_REPORT.md'
report.write_text('''# LABOOK 19차 실제 배포용 데이터 제작 보고서\n\n## 제작 대상\n- 067 화학분석기사 (`chemical-analysis-engineer`)\n- 068 한식조리기능사 (`korean-cuisine-craftsman`)\n- 069 양식조리기능사 (`western-cuisine-craftsman`)\n- 070 중식조리기능사 (`chinese-cuisine-craftsman`)\n\n## 제작 기준\n- 4개 종목별 독립 JSON 작성\n- Q-Net 공식 종목정보와 현재 적용 출제기준 기준\n- 시험과목, 검정방법, 합격기준, 응시료 개별 반영\n- 응시자격, 현실가이드, 준비기간, 탈락 포인트, 공부전략 개별 작성\n- 취업·활용, FAQ, Related, TrustInfo, FinalCTA, SEO 개별 작성\n- `lastUpdated`, `lastVerified`: 2026-07-29\n''', encoding='utf-8')

print('created', len(records), 'records')
