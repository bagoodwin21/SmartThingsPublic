export interface ConditionFAQ {
  question: string;
  answer: string;
}

export interface ConditionInfo {
  title: string;
  /** One-line description used on the home page tiles. */
  description: string;
  /** Two-sentence description used on the /what-we-treat index cards. */
  summary: string;
  tagline: string;
  /** "What's happening in your body" — plain-English explanation. */
  whatsHappening: string[];
  /** "Symptoms we commonly see" — checklist items. */
  symptoms: string[];
  /** "How CYRA approaches this" — labs, process, care plan. */
  approach: string[];
  /** "What treatment might look like" — general, not medical advice. */
  treatment: string[];
  /** "Why physician-led matters" for this condition. */
  whyPhysicianLed: string;
  faqs: ConditionFAQ[];
}

/** Conditions treated, keyed by their /what-we-treat/[condition] slug. */
export const conditions: Record<string, ConditionInfo> = {
  perimenopause: {
    title: "Perimenopause",
    description:
      "Years before your last period, your hormones start shifting. We catch it early.",
    summary:
      "Your hormones begin shifting years before your last period — often starting in your late 30s or early 40s. We recognize the pattern early and intervene, instead of telling you to come back when it's 'really' menopause.",
    tagline:
      "Your hormones start shifting years before menopause. We don't wait to intervene.",
    whatsHappening: [
      "Perimenopause is the transition leading up to menopause, and it can last anywhere from four to ten years. During this time, your ovaries don't shut down — they become unpredictable. Estrogen doesn't decline in a smooth line; it spikes and crashes, sometimes within the same month. Progesterone, meanwhile, starts falling earlier and more steadily, because you ovulate less consistently. That mismatch — swinging estrogen on top of declining progesterone — is what makes this phase feel so chaotic.",
      "This is also the phase most likely to be missed. Because your periods may still be regular-ish and your labs can look 'normal' on any given day, perimenopause is routinely misdiagnosed as anxiety, depression, or simply stress. Many women are offered an antidepressant before anyone asks about their cycles. The symptoms are real, and they have a hormonal driver — you're not imagining any of it.",
      "The good news: you don't have to wait it out. Perimenopause responds well to treatment, and addressing it early can protect your sleep, your mood, your relationships, and your long-term health through the transition.",
    ],
    symptoms: [
      "Cycles that are suddenly shorter, longer, or unpredictable",
      "Periods that are noticeably heavier or lighter than they used to be",
      "New or worsening anxiety, sometimes with a racing heart",
      "Mood swings or irritability that feel out of proportion",
      "Waking at 3 a.m. and struggling to fall back asleep",
      "Night sweats — even mild ones",
      "Brain fog: losing words, walking into rooms and forgetting why",
      "Fatigue that rest doesn't fix",
      "Declining libido",
      "Weight creeping on around your midsection despite unchanged habits",
    ],
    approach: [
      "Dr. Mondona starts with your story, not just your labs — your cycle history, how your symptoms track across the month, what's changed and when. In perimenopause, the pattern often tells you more than any single blood draw, because hormone levels fluctuate day to day.",
      "Labs still matter, and we order a comprehensive panel: estradiol, progesterone, FSH, total and free testosterone, a full thyroid panel, and metabolic markers. The goal isn't to 'prove' you're in perimenopause — it's to build a complete picture of where your body is so treatment can be precise.",
      "From there, your 12-month care plan is built around your specific presentation. Perimenopause changes over time, so your plan does too: follow-up visits and repeat labs let Dr. Mondona adjust your protocol as your hormones keep shifting.",
    ],
    treatment: [
      "Treatment in perimenopause is highly individual, but it often starts with cyclic or continuous body-identical progesterone — which can calm the nervous system, improve sleep, and steady heavy or erratic cycles. Depending on your symptoms and labs, low-dose transdermal estradiol may be added to smooth out the estrogen swings.",
      "When labs and symptoms point to it, testosterone can be part of the plan as well — it's often the missing piece for energy, libido, and mental sharpness. Alongside hormones, your plan addresses sleep, stress, and metabolic health, because they all feed each other during this transition. Nothing here is one-size-fits-all, and nothing on this page is a prescription — your plan is designed after your intake visit and labs.",
    ],
    whyPhysicianLed:
      "Perimenopause is the hardest phase of the transition to diagnose and treat, precisely because labs fluctuate and symptoms overlap with thyroid disease, anxiety disorders, and more. A protocol can't make that call — a clinician has to. Dr. Mondona's training as a board-certified DO means she's evaluating your whole system, ruling out look-alikes, and adjusting treatment on clinical judgment rather than a flowchart. And because you see her at every visit, she knows how this month compares to three months ago.",
    faqs: [
      {
        question: "Am I too young for perimenopause?",
        answer:
          "Probably not. Perimenopause commonly begins in the early-to-mid 40s, and for some women in their late 30s. Age alone never rules it out — your symptoms and cycle pattern matter far more than the number on your birthday.",
      },
      {
        question: "My labs came back 'normal.' How can this be hormonal?",
        answer:
          "In perimenopause, hormones swing dramatically from day to day, so a single blood draw can easily land in the normal range even when your levels are crashing and spiking around it. That's why we interpret labs alongside your symptom pattern and cycle history — and sometimes repeat them at specific points in your cycle.",
      },
      {
        question: "Can you treat perimenopause before my periods stop?",
        answer:
          "Yes — and that's exactly the point. You don't need to wait for a menopause 'diagnosis' to get relief. Treating perimenopause early can protect your sleep, mood, and quality of life through the entire transition.",
      },
      {
        question: "Is this just anxiety? My doctor offered me an antidepressant.",
        answer:
          "New-onset anxiety in your 40s — especially alongside cycle changes, night waking, or brain fog — is very often hormonal. Antidepressants help some women and have a real place in care, but they shouldn't be the reflex answer before anyone has looked at your hormones. We look first.",
      },
      {
        question: "Do I need to stop my birth control to be evaluated?",
        answer:
          "No — don't change anything before we talk. Hormonal birth control does affect what labs can tell us, and it can also mask perimenopause symptoms. Dr. Mondona will walk through your options and, if any transition makes sense, plan it carefully with you.",
      },
    ],
  },

  menopause: {
    title: "Menopause",
    description:
      "Comprehensive HRT management tailored to your labs and your life.",
    summary:
      "Menopause care built on current evidence, not 2002 headlines. Comprehensive HRT managed by a physician and tailored to your labs, your symptoms, and your goals.",
    tagline: "Evidence-based HRT, explained clearly, dosed for your body.",
    whatsHappening: [
      "Menopause is officially the point twelve months after your last period, when your ovaries have largely stopped producing estrogen and progesterone. But 'officially' undersells it: estrogen receptors live in your brain, bones, heart, skin, and virtually every other system. When estrogen goes, the effects show up everywhere — hot flashes and night sweats, broken sleep, mood changes, vaginal dryness, joint aches, and a brain that doesn't feel like yours.",
      "If you've been afraid of hormone therapy, you're not alone — and it's worth knowing where that fear came from. The 2002 Women's Health Initiative study made headlines linking HRT to breast cancer and heart disease, and an entire generation of women was taken off hormones nearly overnight. In the two decades since, re-analysis of that data has told a much more reassuring story: the risks were overstated, they applied mostly to older women starting specific older formulations many years past menopause, and for most healthy women in early menopause, the benefits of HRT outweigh the risks.",
      "This is what researchers call the timing hypothesis: starting hormone therapy within roughly ten years of menopause appears not only safe for most women but potentially protective — for bones, and possibly for heart and brain health. The modern question isn't 'is HRT dangerous?' It's 'what's the right formulation, dose, and route for this particular woman?' That's a question that deserves a physician's attention.",
    ],
    symptoms: [
      "Hot flashes, from mild warmth to drenching heat",
      "Night sweats that wreck your sleep",
      "Insomnia — trouble falling or staying asleep",
      "Vaginal dryness or discomfort with sex",
      "Mood changes: flatness, irritability, tearfulness",
      "Brain fog and word-finding trouble",
      "Joint aches and stiffness",
      "Skin and hair changes — dryness, thinning",
      "Urinary urgency or more frequent UTIs",
      "Loss of libido",
    ],
    approach: [
      "Your care starts with a comprehensive intake: your full health history, family history, symptom picture, and personal risk factors — the context that determines what's safe and what's likely to work for you. Dr. Mondona then orders a complete lab panel: estradiol, FSH, testosterone, thyroid, and metabolic markers.",
      "Then comes the conversation most women never get: a clear, unhurried explanation of the actual evidence on HRT — benefits, risks, formulations, and routes — so you can make an informed decision rather than a fear-based one. No pressure in either direction; the goal is that you understand your options.",
      "Your 12-month care plan starts you at a thoughtful dose and then refines it. Follow-up visits and repeat labs let Dr. Mondona tune your protocol to how you actually feel — because the target isn't a lab number, it's you sleeping through the night and feeling like yourself.",
    ],
    treatment: [
      "For most women, modern HRT means body-identical hormones delivered thoughtfully: transdermal estradiol (a patch or gel, which bypasses the liver and carries a lower clot risk than older oral forms) paired with oral micronized progesterone if you have a uterus. Vaginal estrogen can be added for dryness and urinary symptoms, and testosterone is included when labs and symptoms support it.",
      "If hormones aren't right for you — by choice or by medical history — there are legitimate non-hormonal options for hot flashes, sleep, and mood, and Dr. Mondona will walk through them honestly. Everything here is general information, not a prescription; your actual plan is built after your intake and labs.",
    ],
    whyPhysicianLed:
      "Menopause care is fundamentally a risk-benefit conversation: your personal and family history, your cardiovascular picture, your breast health, and your goals all shape what's appropriate. That nuance is exactly where physician training earns its keep. As a board-certified DO, Dr. Mondona can navigate contraindications, weigh formulation and route trade-offs, and adjust course when your situation changes — rather than routing you through a standardized protocol and hoping you fit it.",
    faqs: [
      {
        question: "Isn't HRT dangerous? What about the WHI study?",
        answer:
          "The 2002 WHI findings caused two decades of fear, but re-analysis has substantially changed the picture. The elevated risks were concentrated in older women starting older formulations many years past menopause. For most healthy women within about ten years of menopause, current evidence shows the benefits of appropriately prescribed HRT outweigh the risks. Dr. Mondona will walk through your specific risk picture — that conversation is the foundation of your plan.",
      },
      {
        question: "Am I past the window to start HRT?",
        answer:
          "The 'timing window' — roughly ten years from menopause — is a guideline, not a cliff. Some women outside it are still good candidates depending on health status and symptoms, and some options (like vaginal estrogen) remain appropriate at nearly any age. It's an individual assessment, which is exactly what your intake visit is for.",
      },
      {
        question: "How long can I stay on HRT?",
        answer:
          "There's no arbitrary stop date. Current guidance supports continuing HRT as long as benefits outweigh risks for you, reassessed regularly. Many women continue for years; the key is ongoing monitoring with a provider who knows your history — which is built into your care plan.",
      },
      {
        question: "What's the difference between bioidentical and conventional HRT?",
        answer:
          "'Bioidentical' simply means the hormone is molecularly identical to what your body makes — like estradiol and micronized progesterone, both available as FDA-approved products. Dr. Mondona works with both FDA-approved and, where appropriate, compounded options, choosing based on evidence and your needs rather than marketing labels.",
      },
      {
        question: "Will HRT help me sleep?",
        answer:
          "Very often, yes. Night sweats fragment sleep directly, and progesterone has a naturally calming, sleep-promoting effect for many women. Sleep is one of the most commonly reported improvements after starting well-dosed HRT — and one of the first things we ask about at follow-up.",
      },
    ],
  },

  "testosterone-therapy": {
    title: "Testosterone Therapy",
    description:
      "Low libido, fatigue, brain fog? Testosterone could be the missing piece.",
    summary:
      "Testosterone is one of the most abundant hormones in a woman's body — and the most overlooked in her care. We treat it as a core part of hormone health, not an afterthought.",
    tagline: "Low libido, brain fog, and fatigue aren't 'just getting older.'",
    whatsHappening: [
      "Here's something most women are never told: testosterone isn't a 'male hormone' that women have a trace of. Before menopause, your body makes more testosterone than estrogen. It fuels libido, motivation, mental sharpness, muscle maintenance, bone strength, and that hard-to-name sense of drive and well-being.",
      "And it declines early — starting in your 30s, falling steadily through your 40s and 50s. By menopause, many women have half the testosterone they had at 25. Unlike estrogen's dramatic exit, testosterone fades quietly, which is why its symptoms — flat libido, flat mood, flat energy — get chalked up to stress, parenting, or 'just getting older.'",
      "The other problem is how it's measured. Standard lab ranges for women's testosterone are wide and largely based on population averages, not on where women actually feel well. So women are routinely told their level is 'within normal range' when it's scraping the bottom of it. Normal-on-paper and optimal-for-you are not the same thing.",
    ],
    symptoms: [
      "Libido that has faded or disappeared",
      "Difficulty with arousal or muted response",
      "Persistent fatigue, even with decent sleep",
      "Brain fog and slower mental processing",
      "Loss of motivation and drive",
      "A flat or blunted mood — not depressed, just dimmed",
      "Losing muscle tone despite exercising",
      "Workouts that take longer to recover from",
      "Declining confidence or sense of well-being",
      "Stubborn weight gain, especially around the middle",
    ],
    approach: [
      "Dr. Mondona measures what actually matters: total testosterone, free testosterone (the portion your body can use), and SHBG — the binding protein that determines how much of your testosterone is actually available. Many evaluations skip free testosterone and SHBG entirely, which is how low-normal results get waved through.",
      "Just as important, testosterone is never assessed in a vacuum. Your panel includes estradiol, progesterone, thyroid, and metabolic markers, because symptoms like fatigue and brain fog have several possible drivers and treatment should target the right one.",
      "If testosterone therapy is appropriate, it's built into your care plan as a core component — not an upsell. Follow-up labs at regular intervals confirm your levels are in a safe, effective range and let Dr. Mondona fine-tune your dose based on how you respond.",
    ],
    treatment: [
      "For women, testosterone is typically prescribed as a daily transdermal cream or gel at a fraction of male dosing — the goal is restoring your levels to a healthy female physiologic range, nothing more. Dosing starts conservatively and is titrated based on follow-up labs and, most importantly, how you feel.",
      "Testosterone often works best as part of a complete hormone picture, alongside estrogen and progesterone when those are indicated. Effects build gradually — energy and clarity often improve over weeks, libido over two to three months. This is general information rather than medical advice; whether testosterone belongs in your plan is determined by your labs, history, and consultation.",
    ],
    whyPhysicianLed:
      "Testosterone for women is prescribed off-label in the U.S., which means there's no packaged protocol to follow — appropriate use rests entirely on clinical judgment: correct lab interpretation (including free testosterone and SHBG), careful dosing, and diligent monitoring. This is exactly why many NP-led platforms don't offer it, offer it reluctantly, or charge for it as an add-on. Dr. Mondona prescribes and monitors it herself, as a routine part of complete hormone care.",
    faqs: [
      {
        question: "Isn't testosterone a male hormone?",
        answer:
          "No — it's a human hormone. Women's bodies make and depend on testosterone for libido, energy, cognition, muscle, and bone. Women simply need it in smaller amounts, and replacement is dosed accordingly, to female physiologic levels.",
      },
      {
        question: "Will I grow facial hair or get a deep voice?",
        answer:
          "At properly monitored female doses, masculinizing side effects are uncommon and typically mild and reversible (like slight acne) if they occur at all. Those stories come from excessive dosing without monitoring. Your levels are checked regularly precisely to keep you in a safe range.",
      },
      {
        question: "My doctor tested me and said my level is normal.",
        answer:
          "Ask what was tested and where you fell in the range. 'Normal' spans a huge range, and symptoms often live at the bottom of it. If free testosterone and SHBG weren't measured, the evaluation was incomplete — those tell us how much testosterone your body can actually use.",
      },
      {
        question: "Is testosterone FDA-approved for women?",
        answer:
          "There's currently no FDA-approved testosterone product specifically for women in the U.S., so it's prescribed off-label — a common, legal, and evidence-supported practice, endorsed for low libido by international menopause societies. It does mean physician judgment and monitoring matter more, which is exactly how we treat it.",
      },
      {
        question: "How soon will I notice a difference?",
        answer:
          "Most women notice energy, mood, and mental clarity shifting within four to eight weeks, with libido typically following over two to three months. We check labs and symptoms along the way and adjust your dose based on both.",
      },
    ],
  },

  "estrogen-progesterone": {
    title: "Estrogen & Progesterone",
    description:
      "Bioidentical and conventional HRT options, explained and personalized.",
    summary:
      "Estradiol or conjugated estrogen? Progesterone or progestin? Patch, gel, pill, or cream? The details determine how you feel — and we walk you through every one.",
    tagline: "The right hormones, in the right form, at the right dose.",
    whatsHappening: [
      "'Estrogen' and 'progesterone' sound like single things, but the prescriptions that carry those names differ in ways that genuinely matter. Estradiol is the estrogen your ovaries actually make; conjugated equine estrogens (the classic 'Premarin') are a mixture derived from horse urine that behaves differently in your body. Micronized progesterone is molecularly identical to your own progesterone; synthetic progestins are related molecules with different — sometimes less favorable — effects on mood, sleep, and breast tissue. Much of the fear around HRT traces back to studies of the older combinations.",
      "How a hormone enters your body matters almost as much as which hormone it is. Estradiol through the skin — a patch or gel — bypasses the liver, which is why it carries a lower risk of blood clots than oral estrogen. Oral micronized progesterone, on the other hand, has a mild sedating quality many women love at bedtime. Vaginal estrogen works locally for dryness and urinary symptoms with minimal absorption. Pill, patch, gel, cream: each has a real clinical rationale.",
      "This is why one-size-fits-all HRT fails so many women. The same 'estrogen plus progesterone' label can describe excellent therapy or a poor fit, depending on the molecule, the route, the dose — and the woman. Getting these details right is most of the craft.",
    ],
    symptoms: [
      "Hot flashes or night sweats",
      "Sleep that's light, broken, or hard to come by",
      "Anxiety or a racing mind, especially before your period",
      "Irritability or PMS that's gotten worse with age",
      "Heavy, flooding, or erratic periods",
      "Breast tenderness",
      "Headaches or migraines that track your cycle",
      "Vaginal dryness or discomfort with sex",
      "Brain fog",
      "HRT you've tried before that never felt quite right",
    ],
    approach: [
      "Dr. Mondona starts with your labs, your history, and — importantly — your past experience with hormones. If you've tried HRT or birth control that made you feel worse, that's diagnostic information, not a dead end. It often points to the wrong molecule or route rather than the wrong idea.",
      "Your risk picture shapes the route: personal or family clot history points toward transdermal estradiol; sleep struggles argue for oral progesterone at night; prominent genitourinary symptoms may call for adding local vaginal estrogen. These decisions are made with you, with the reasoning explained in plain English.",
      "Then your care plan treats dosing as a process, not a one-time event. Follow-up visits and labs let Dr. Mondona nudge doses, switch routes, or change formulations until the plan actually fits — that iteration is where most of the benefit lives.",
    ],
    treatment: [
      "A typical modern regimen pairs transdermal estradiol (patch or gel) with oral micronized progesterone at bedtime for women with a uterus. From there it's tailored: vaginal estrogen for local symptoms, different delivery methods if your skin or schedule doesn't suit a patch, and compounded formulations when a standard product genuinely doesn't fit — chosen for clinical reasons, not by default.",
      "Doses start thoughtfully and are adjusted based on symptom response and labs. Most women feel meaningful change within weeks, with full benefit emerging over a few months of tuning. As always, this is general education — your specific regimen comes out of your intake, labs, and history.",
    ],
    whyPhysicianLed:
      "Choosing between estradiol and conjugated estrogens, progesterone and progestins, oral and transdermal routes — while weighing clot risk, breast health, migraine history, and sleep — is pharmacology-heavy work. It's the difference between prescribing 'HRT' and prescribing the right HRT. Dr. Mondona's physician training covers exactly this terrain, and because she personally manages your plan visit after visit, adjustments are informed by your whole history rather than a protocol tier.",
    faqs: [
      {
        question: "What's the difference between bioidentical and synthetic hormones?",
        answer:
          "Bioidentical means molecularly identical to what your body produces — like estradiol and micronized progesterone, both available as FDA-approved products. Synthetic progestins and conjugated estrogens are different molecules with different effect profiles. Much of the risk data that scared women away from HRT came from the older synthetic combinations, not from modern body-identical regimens.",
      },
      {
        question: "Patch versus pill — is one safer?",
        answer:
          "For estrogen, transdermal delivery (patch or gel) bypasses the liver and carries a lower risk of blood clots than oral estrogen, which makes it the preferred starting route for many women. Pills still have a place depending on your situation. It's a genuine clinical decision, and we'll make it together.",
      },
      {
        question: "Do I need progesterone if I've had a hysterectomy?",
        answer:
          "Progesterone's essential job in HRT is protecting the uterine lining, so after hysterectomy it's not strictly required. That said, some women without a uterus still choose it for its sleep and mood benefits. It becomes an option rather than an obligation — another decision we make based on you.",
      },
      {
        question: "Are compounded hormones safe?",
        answer:
          "Compounded hormones are made by specialized pharmacies and can be valuable when standard products don't fit — an unusual dose, an allergy to an ingredient, a delivery form that doesn't exist commercially. They're not inherently better or more 'natural' than FDA-approved bioidenticals, though. Dr. Mondona uses both, choosing FDA-approved products first when they fit and compounding when there's a real reason.",
      },
      {
        question: "I tried HRT before and felt awful. Does that mean it's not for me?",
        answer:
          "Usually not. A bad experience most often means the wrong formulation, dose, or route — a progestin that tanked your mood, an estrogen dose that overshot, a pill where a patch would have served you better. Your history of what didn't work is one of the most useful inputs we have for finding what will.",
      },
    ],
  },

  "thyroid-adrenal": {
    title: "Thyroid & Adrenal",
    description:
      "Hormones don't work in isolation. We look at the full picture.",
    summary:
      "Fatigue, weight gain, and brain fog aren't always about estrogen. We evaluate thyroid, adrenal, and sex hormones together — because that's how your body runs them.",
    tagline: "Hormones don't work in isolation. Neither do we.",
    whatsHappening: [
      "Your thyroid sets the metabolic pace for every cell in your body, and your adrenal glands manage your stress response through cortisol. Both systems are deeply intertwined with your sex hormones — and both commonly falter in midlife, producing symptoms that look almost identical to perimenopause: fatigue, weight gain, brain fog, low mood, thinning hair.",
      "The standard screening approach misses a lot. Most primary care checks a single number — TSH — and calls the thyroid 'fine' if it lands anywhere in a broad reference range. But TSH alone can't see subclinical hypothyroidism, conversion problems (your body failing to turn inactive T4 into active T3), or autoimmune thyroid disease brewing beneath a still-normal TSH. Women — who account for the large majority of thyroid disease — are routinely told they're fine while feeling anything but.",
      "On the adrenal side, you may have heard the term 'adrenal fatigue.' The popular version — exhausted glands that stop making cortisol — isn't supported by evidence, and we won't sell it to you. What is real is HPA-axis dysregulation: chronic stress shifting the brain-adrenal signaling that governs your cortisol rhythm, leaving you wired at night, dragging in the morning, and craving sugar by afternoon. And because estrogen affects thyroid-binding proteins and cortisol dynamics, perimenopause can unmask or amplify both problems at once.",
    ],
    symptoms: [
      "Fatigue that's out of proportion to your sleep",
      "Feeling cold when no one else is",
      "Weight gain that won't respond to your usual efforts",
      "Hair thinning or loss, including the outer eyebrows",
      "Dry skin and brittle nails",
      "Constipation",
      "Brain fog and slowed thinking",
      "Feeling 'wired but tired' — exhausted yet unable to wind down",
      "Afternoon energy crashes",
      "Waking up tired no matter how long you slept",
    ],
    approach: [
      "Dr. Mondona orders a complete thyroid panel — TSH, free T4, free T3, and thyroid antibodies — not TSH alone. That's the difference between checking a warning light and actually looking at the engine: it can reveal subclinical hypothyroidism, poor T4-to-T3 conversion, and autoimmune thyroiditis that single-marker screening misses.",
      "Cortisol and adrenal function are assessed in context: your stress load, sleep quality, energy pattern across the day, and relevant labs. The point isn't to hand you a trendy label — it's to figure out what's actually driving the symptoms.",
      "Crucially, all of it is read alongside your sex hormones, because these systems move together. Estrogen changes thyroid hormone binding; thyroid status changes how HRT feels; cortisol affects both. Evaluating them as one system — within one care plan, by one physician — is the whole point.",
    ],
    treatment: [
      "When labs confirm hypothyroidism, treatment usually means thyroid hormone replacement — most often levothyroxine (T4), sometimes with liothyronine (T3) added when conversion is the issue — started carefully and rechecked until your levels and your symptoms agree. If antibodies reveal autoimmune thyroid disease, that shapes monitoring and expectations too.",
      "For HPA-axis dysregulation, the honest treatment isn't a miracle supplement — it's systematically restoring the inputs that regulate cortisol: sleep timing and quality, stress load, blood sugar stability, and movement, with your hormone therapy tuned to support rather than fight that work. And because thyroid, adrenal, and sex hormones interact, your plan is adjusted as a whole when any one piece changes. As with everything on this page, this is general education, not individual medical advice.",
    ],
    whyPhysicianLed:
      "Thyroid and adrenal medicine is where narrow-scope telehealth hits its limits: most menopause platforms either don't test beyond the basics or refer you elsewhere the moment your TSH looks off, leaving you to coordinate your own care across providers who never talk to each other. As a board-certified DO trained to treat the whole system, Dr. Mondona keeps thyroid and adrenal evaluation inside your care plan — so the physician adjusting your estrogen is the same one reading your thyroid panel.",
    faqs: [
      {
        question: "My TSH is normal, but I still feel exhausted. What now?",
        answer:
          "A normal TSH doesn't end the conversation. We check free T4, free T3, and thyroid antibodies, because subclinical dysfunction, conversion problems, and early autoimmune disease can all hide behind a normal TSH. And if your thyroid truly is fine, that's useful too — it tells us to look harder at sex hormones, cortisol rhythm, and metabolic health.",
      },
      {
        question: "Is adrenal fatigue real?",
        answer:
          "The popular version — glands that 'wear out' and stop making cortisol — isn't supported by evidence. But the symptoms people use the term for are absolutely real, and they usually reflect HPA-axis dysregulation: a disrupted cortisol rhythm driven by chronic stress and poor sleep. We treat the real mechanism rather than the marketing term.",
      },
      {
        question: "Can thyroid problems mimic menopause?",
        answer:
          "Remarkably well — fatigue, weight gain, brain fog, mood changes, and cycle irregularity can all be thyroid-driven, hormone-driven, or both at once. That overlap is exactly why we test both systems together instead of assuming everything in your 40s is estrogen.",
      },
      {
        question: "Will you actually treat my thyroid, or refer me out?",
        answer:
          "Straightforward thyroid conditions — hypothyroidism, subclinical hypothyroidism, Hashimoto's management — are treated within your CYRA care plan. If something needs a specialist, like a suspicious nodule or complex Graves' disease, Dr. Mondona will say so plainly and help you get there.",
      },
      {
        question: "I'm already on thyroid medication. Do I have to switch anything?",
        answer:
          "No. Bring your current regimen and history; Dr. Mondona reviews your full panel and how you feel on your current dose. Sometimes the medication is right and something else is driving your symptoms; sometimes dosing or formulation deserves a revisit — especially since starting estrogen can change your thyroid hormone requirements.",
      },
    ],
  },

  "weight-management": {
    title: "Midlife Weight Management",
    description:
      "Metabolic changes are real. We address the root cause, not just calories.",
    summary:
      "Midlife weight gain isn't a willpower problem — it's a hormonal and metabolic one. We treat the cause, with hormone optimization first and GLP-1s as a tool when appropriate.",
    tagline:
      "Metabolic changes in midlife are real. The solution isn't just eating less.",
    whatsHappening: [
      "If you're gaining weight in your 40s or 50s doing exactly what always worked before, you're not doing it wrong — the rules changed. As estrogen declines, your body actively redistributes fat toward your midsection, a pattern change that has nothing to do with your discipline. At the same time, falling estrogen and testosterone make it harder to hold onto muscle, and muscle is what keeps your metabolism running at pace.",
      "Underneath that, insulin resistance quietly builds: your cells respond less readily to insulin, so your body needs more of it to manage the same food — and high insulin is a fat-storage signal, especially around the middle. Add midlife cortisol (stress, broken sleep, caregiving loads) and you get cravings, energy crashes, and a body that hangs onto fat while you eat less than ever.",
      "This is why 'eat less, move more' keeps failing you — cutting harder into a stressed, insulin-resistant, muscle-losing system often makes the metabolism slower still. The way out is treating the actual drivers: the hormones, the insulin, the muscle, the sleep. It's not about trying harder at the old game; it's about fixing the board.",
    ],
    symptoms: [
      "Weight gain despite unchanged eating and exercise",
      "Fat shifting to your belly, even at a stable weight",
      "Intense sugar or carb cravings, especially afternoons",
      "Energy crashes after meals",
      "Diets that used to work no longer moving the scale",
      "Losing strength or muscle tone despite working out",
      "Feeling puffy or bloated",
      "Sleep problems paired with next-day hunger",
      "Stress eating that feels newly hard to control",
      "Hunger that returns quickly after full meals",
    ],
    approach: [
      "Dr. Mondona starts with the metabolic labs most weight programs never draw: fasting insulin and glucose, A1c, a complete lipid panel, and inflammatory markers — alongside your full hormone panel, including thyroid and testosterone. You can't treat insulin resistance you never measured.",
      "The assessment focuses on body composition and metabolic health, not just a scale number — because trading muscle loss for a lower weight makes midlife metabolism worse, not better. Your history, sleep, stress, and past diet attempts all feed the picture.",
      "Then your 12-month care plan sequences things deliberately: hormone and thyroid optimization to restore the foundation, targeted metabolic treatment where labs support it, and follow-ups that track composition, labs, and how you actually feel — with the plan adjusted as your body responds.",
    ],
    treatment: [
      "Treatment usually starts with the foundation: optimizing estrogen, progesterone, testosterone, and thyroid so your metabolism isn't fighting you. From there, the emphasis is protein and strength — preserving and rebuilding the muscle that drives your metabolic rate — along with sleep and stress work that lowers the cortisol pressure. No crash diets; they're how midlife metabolisms get slower.",
      "When labs and history support it, GLP-1 medications (like semaglutide or tirzepatide) can be a genuinely useful tool — quieting food noise and improving insulin dynamics — prescribed and monitored by Dr. Mondona as part of the plan, with attention to preserving muscle while you lose fat. A GLP-1 alone, without the hormonal and muscular foundation, tends to produce regain; used within a complete plan, it can be the piece that finally makes everything else work. Your specific regimen, as always, is determined after your intake and labs.",
    ],
    whyPhysicianLed:
      "Midlife weight is where several systems collide — sex hormones, thyroid, insulin, cortisol, medications, sleep — and treating it well means managing all of them at once, including prescribing decisions like GLP-1 dosing alongside HRT. Subscription weight-loss platforms typically hand you a single tool and a chatbot. At CYRA, the physician optimizing your hormones is the same one managing your metabolic treatment, so the pieces are designed to work together rather than prescribed in silos.",
    faqs: [
      {
        question: "Do you prescribe GLP-1 medications like semaglutide?",
        answer:
          "Yes, when labs, history, and goals support it. GLP-1s are prescribed as one tool within your complete care plan — alongside hormone optimization, muscle preservation, and metabolic monitoring — not as a standalone subscription. If a GLP-1 isn't right for you, Dr. Mondona will say so and explain why.",
      },
      {
        question: "Why am I gaining weight when I haven't changed anything?",
        answer:
          "Because your hormones changed even though your habits didn't. Declining estrogen redistributes fat to the midsection, muscle loss slows your metabolic rate, and building insulin resistance means the same meals now promote more fat storage. It's physiology, not failure — and each of those drivers is treatable.",
      },
      {
        question: "Will HRT alone fix my weight?",
        answer:
          "Usually not alone — but it matters more than most weight programs admit. HRT helps stop the fat redistribution and muscle loss that make everything harder, and it improves the sleep and energy you need to do the rest. Think of it as restoring the foundation; nutrition, strength, and sometimes metabolic medication build on it.",
      },
      {
        question: "Do I have to follow a strict diet?",
        answer:
          "No. Aggressive restriction is counterproductive for midlife metabolisms — it accelerates muscle loss and raises stress on the system. The nutritional emphasis is protein adequacy, blood sugar stability, and sustainability, tailored to your life. The goal is a way of eating you can keep, not a program you survive.",
      },
      {
        question: "Is it safe to take a GLP-1 while on hormone therapy?",
        answer:
          "For most women, yes — the combination is common and can be complementary, since HRT supports the muscle and bone you want to protect while losing weight. It does require coordinated monitoring, which is exactly why having one physician manage both, with regular labs and follow-ups, matters.",
      },
    ],
  },
};
