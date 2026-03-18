export type WizardOption = {
  value: string;
  label: string;
  description?: string;
  set_tags?: Record<string, any>;
  next: string;
};

export type WizardStep = {
  id: string;
  title: string;
  question: string;
  description?: string;
  options: WizardOption[];
};

export type RecommendationRule = {
  id: string;
  when: Record<string, any>;
  recommend: string[];
  alternatives: string[];
  add_ons: string[];
};

export const wizardLogic = {
  version: "1.1.4",
  intent: "recommended_only_wizard",
  tag_schema: {
    goal: [
      "estimate",
      "compare_groups",
      "association",
      "categorical_association",
      "model_with_predictors",
      "unsupervised",
      "time_series",
      "survival",
      "power_planning",
      "diagnostics_posthoc_effectsize",
    ],
    outcome: ["continuous", "binary", "categorical", "count", "ordinal", "time_to_event", "none"],
    design: ["independent", "paired", "repeated", "clustered", "none"],
    groups: ["two", "three_plus", "none"],
    factors: ["one", "two_plus", "none"],
    task: [
      "estimate_mean",
      "estimate_proportion",
      "independence_test",
      "agreement",
      "effect_size",
      "forecasting",
      "stationarity",
      "model_adequacy",
      "multivariate_dynamics",
      "causality",
      "describe_survival",
      "compare_survival",
      "model_survival",
      "clustering",
      "dim_reduction",
      "power_sample_size",
      "multivariate_outcomes",
      "none",
    ],
    modeling_preference: ["interpretable", "predictive_ml", "regularized", "none"],
    assoc_pair: ["cont_cont", "bin_cont", "other", "unknown"],
    control_vars: ["yes", "no", "unknown"],
    diag: [
      "normality",
      "equal_variance",
      "autocorr",
      "heterosk",
      "multiple_testing",
      "posthoc",
      "effect_size",
      "unknown",
    ],
    test_against_mu0: ["yes", "no"],
    posthoc: ["none", "all_pairwise", "vs_control"],
  },

  steps: [
    {
      id: "goal",
      title: "Research Goal",
      question: "What is your primary goal?",
      description:
        "Start here. Choose the option that best matches what you want to learn from your data (compare, estimate, predict, etc.).",
      options: [
        {
          value: "estimate",
          label: "Estimate a parameter (mean/proportion)",
          description:
            "You have one group and want to estimate a typical value (like an average) or a percentage, often with a confidence interval and/or a test against a reference value.",
          set_tags: { goal: "estimate" },
          next: "estimate_target",
        },
        {
          value: "compare_groups",
          label: "Compare groups (differences)",
          description:
            "You want to know whether groups differ (for example, treatment vs control, or multiple categories) in their averages or proportions.",
          set_tags: { goal: "compare_groups" },
          next: "compare_outcome",
        },
        {
          value: "association",
          label: "Measure association (correlation/relationship)",
          description:
            "You want to quantify how two variables move together (for example, does income increase as education increases?). This is about relationship strength, not group differences.",
          set_tags: { goal: "association" },
          next: "assoc_types",
        },
        {
          value: "categorical_association",
          label: "Categorical association / agreement",
          description:
            "You want to analyze relationships between categories (like a contingency table) or measure agreement between raters/labels (how consistently people or systems classify items).",
          set_tags: { goal: "categorical_association" },
          next: "cat_assoc_task",
        },
        {
          value: "model_with_predictors",
          label: "Supervised Learning",
          description:
            "You want to predict or explain an outcome using one or more inputs (predictors). This includes regression and classification models.",
          set_tags: { goal: "model_with_predictors" },
          next: "model_outcome",
        },
        {
          value: "unsupervised",
          label: "Unsupervised learning",
          description:
            "You do not have a single outcome variable. You want to find structure in the data (clusters) or reduce dimensions (embeddings).",
          set_tags: { goal: "unsupervised" },
          next: "unsup_task",
        },
        {
          value: "time_series",
          label: "Time series",
          description:
            "Your data are ordered over time (like daily sales). You want forecasting, stationarity checks, or time-based relationship analysis.",
          set_tags: { goal: "time_series" },
          next: "ts_task",
        },
        {
          value: "survival",
          label: "Survival / time-to-event",
          description:
            "Your outcome is a time until something happens (like time to failure or time to recovery), often with some subjects not experiencing the event yet (censoring).",
          set_tags: { goal: "survival" },
          next: "surv_task",
        },
        {
          value: "power_planning",
          label: "Power / sample size planning",
          description:
            "You are planning a study and want to estimate how many samples you need to reliably detect an effect (or what power you have with a given sample size).",
          set_tags: { goal: "power_planning", task: "power_sample_size" },
          next: "leaf",
        },
        {
          value: "diagnostics_posthoc_effectsize",
          label: "Diagnostics / post-hoc / corrections / effect sizes",
          description:
            "You already ran (or will run) a main analysis and now need checks (assumptions), follow-up comparisons, multiple-testing corrections, or effect size measures.",
          set_tags: { goal: "diagnostics_posthoc_effectsize" },
          next: "diag_task",
        },
      ],
    },

    {
      id: "estimate_target",
      title: "Estimate Target",
      question: "What are you estimating?",
      description:
        "Choose what kind of number you want to estimate from a single group: an average (mean) or a percentage/proportion.",
      options: [
        {
          value: "mean",
          label: "Mean of a single sample",
          description:
            "Your outcome is numeric (like height, temperature, score). You want the average value for one group, possibly compared to a reference average.",
          set_tags: {
            outcome: "continuous",
            task: "estimate_mean",
            groups: "none",
            design: "independent",
          },
          next: "estimate_reference_mean",
        },
        {
          value: "proportion",
          label: "Single proportion / rate",
          description:
            "Your outcome is a yes/no or success/failure indicator. You want the percentage of successes in one group (for example, conversion rate).",
          set_tags: {
            outcome: "binary",
            task: "estimate_proportion",
            groups: "none",
            design: "independent",
          },
          next: "leaf",
        },
      ],
    },

    {
      id: "estimate_reference_mean",
      title: "Reference Mean",
      question: "Do you want to test against a hypothesized/reference value ($\\mu_0$)?",
      description:
        "Sometimes you are comparing your sample average to a known or claimed value ($\\mu_0$), such as a historical average or a target value.",
      options: [
        {
          value: "yes",
          label: "Yes (test mean vs $\\mu_0$)",
          description:
            "Use this if you have a specific reference number ($\\mu_0$) and you want to test whether your sample average is different from it.",
          set_tags: { test_against_mu0: "yes" },
          next: "leaf",
        },
        {
          value: "no",
          label: "No (just estimate/CI)",
          description:
            "Use this if you mainly want an estimate of the mean (often with a confidence interval) and you are not comparing to a specific $\\mu_0$.",
          set_tags: { test_against_mu0: "no" },
          next: "leaf",
        },
      ],
    },

    {
      id: "compare_outcome",
      title: "Outcome Type",
      question: "What is the outcome type?",
      description:
        "To compare groups, we need to know whether your outcome is a numeric measurement or a category/count/proportion.",
      options: [
        {
          value: "continuous",
          label: "Continuous / numeric",
          description: "A number where averages make sense (like blood pressure, exam score, time).",
          set_tags: { outcome: "continuous" },
          next: "compare_design_cont",
        },
        {
          value: "categorical",
          label: "Categorical (counts/proportions)",
          description:
            "A category or yes/no outcome summarized as counts or percentages (like pass/fail, clicked/not clicked, or category labels).",
          set_tags: { outcome: "categorical" },
          next: "compare_design_cat",
        },
      ],
    },

    {
      id: "compare_design_cont",
      title: "Study Design",
      question: "What is the design?",
      description:
        "This determines whether the groups are separate sets of people/things or the same subjects measured more than once.",
      options: [
        {
          value: "independent",
          label: "Independent groups",
          description: "Different subjects/items in each group (Group A and Group B are different people).",
          set_tags: { design: "independent" },
          next: "compare_groups_n",
        },
        {
          value: "paired_repeated",
          label: "Paired / repeated measures",
          description: "The same subjects/items are measured multiple times (before/after on the same people).",
          set_tags: { design: "paired" },
          next: "compare_conditions_n",
        },
      ],
    },

    {
      id: "compare_groups_n",
      title: "Number of Groups",
      question: "How many groups are you comparing?",
      description:
        "The number of groups helps choose between two-group tests (like t-tests) and multi-group tests (like ANOVA).",
      options: [
        {
          value: "two",
          label: "Two",
          description: "Exactly two groups (treatment vs control).",
          set_tags: { groups: "two" },
          next: "leaf",
        },
        {
          value: "three_plus",
          label: "Three or more",
          description: "Three or more groups (three dose levels, multiple categories).",
          set_tags: { groups: "three_plus" },
          next: "compare_factors_3g",
        },
      ],
    },

    {
      id: "compare_factors_3g",
      title: "Number of Factors",
      question: "How many categorical factors define groups?",
      description:
        "A 'factor' is a grouping variable. For example: one factor = (Dose). Two factors = (Dose and Sex).",
      options: [
        {
          value: "one",
          label: "One factor",
          description: "Groups are defined by one category variable (just 'treatment group' or just 'dose').",
          set_tags: { factors: "one" },
          next: "leaf",
        },
        {
          value: "two_plus",
          label: "Two or more factors",
          description:
            "Groups are defined by two or more category variables (like 'dose' and 'sex', or 'region' and 'product type').",
          set_tags: { factors: "two_plus" },
          next: "leaf",
        },
      ],
    },

    {
      id: "compare_conditions_n",
      title: "Conditions",
      question: "How many conditions/timepoints per subject?",
      description:
        "This is how many measurements each subject/item contributes (for example, pre/post is two timepoints).",
      options: [
        {
          value: "two",
          label: "Two",
          description: "Two measurements per subject (before vs after; left vs right).",
          set_tags: { groups: "two", design: "paired" },
          next: "leaf",
        },
        {
          value: "three_plus",
          label: "Three or more",
          description: "Three or more measurements per subject (multiple visits over time).",
          set_tags: { groups: "three_plus", design: "repeated" },
          next: "leaf",
        },
      ],
    },

    {
      id: "compare_design_cat",
      title: "Study Design",
      question: "What is the design?",
      description:
        "For categorical outcomes, we still need to know whether groups are separate or paired (the same units measured twice).",
      options: [
        {
          value: "independent",
          label: "Independent groups",
          description: "Different subjects/items in each group (different people in treatment vs control).",
          set_tags: { design: "independent" },
          next: "cat_table_shape",
        },
        {
          value: "paired_binary",
          label: "Paired binary (pre/post on same units)",
          description:
            "The same subjects/items are measured twice and the outcome is yes/no each time (positive/negative before and after).",
          set_tags: { design: "paired", outcome: "binary" },
          next: "leaf",
        },
      ],
    },

    {
      id: "cat_table_shape",
      title: "Contingency Table",
      question: "What best describes the table?",
      description:
        "A contingency table is a grid of counts. The table size (2×2 vs larger) helps select the right test.",
      options: [
        {
          value: "two_by_two",
          label: "2x2",
          description: "Two categories by two categories (treatment/control by success/failure).",
          set_tags: { groups: "two" },
          next: "leaf",
        },
        {
          value: "rx_c",
          label: "rxc (larger than 2x2)",
          description: "More than two categories in at least one direction (3×2, 4×4, etc.).",
          set_tags: { groups: "three_plus" },
          next: "leaf",
        },
      ],
    },

    {
      id: "assoc_types",
      title: "Variable Types",
      question: "What variables are you associating?",
      description: "Correlation/association depends on the types of the two variables you want to relate.",
      options: [
        {
          value: "cont_cont",
          label: "Continuous-continuous",
          description: "Both variables are numeric (height and weight).",
          set_tags: { outcome: "none", assoc_pair: "cont_cont" },
          next: "partial_needed",
        },
        {
          value: "bin_cont",
          label: "Binary-continuous",
          description: "One variable is yes/no and the other is numeric (smoker vs non-smoker and blood pressure).",
          set_tags: { outcome: "none", assoc_pair: "bin_cont" },
          next: "leaf",
        },
      ],
    },

    {
      id: "partial_needed",
      title: "Control Variables",
      question: "Do you need the association controlling for other variables?",
      description:
        "Sometimes two variables look related only because of a third variable. Controlling variables means adjusting for them so you isolate the direct relationship.",
      options: [
        {
          value: "yes",
          label: "Yes",
          description:
            "You want the relationship after adjusting for one or more other variables (correlation between X and Y after controlling for age).",
          set_tags: { control_vars: "yes" },
          next: "leaf",
        },
        {
          value: "no",
          label: "No",
          description: "You want the straightforward relationship between the two variables without adjusting for anything else.",
          set_tags: { control_vars: "no" },
          next: "leaf",
        },
      ],
    },

    {
      id: "cat_assoc_task",
      title: "Categorical Focus",
      question: "What do you need?",
      description:
        "Choose whether you are testing association between categories, measuring agreement between raters, or reporting an effect size for association.",
      options: [
        {
          value: "independence",
          label: "Test independence (contingency table)",
          description: "You have a table of counts and want to know whether two categorical variables are related (not independent).",
          set_tags: { task: "independence_test" },
          next: "leaf",
        },
        {
          value: "agreement",
          label: "Agreement between raters",
          description:
            "Two or more raters/systems label the same items and you want to quantify how consistent they are (beyond chance agreement).",
          set_tags: { task: "agreement" },
          next: "agreement_raters",
        },
        {
          value: "effect_size",
          label: "Effect size for association",
          description: "You want a number that summarizes how strong a categorical association is (not just whether it is statistically significant).",
          set_tags: { task: "effect_size" },
          next: "leaf",
        },
      ],
    },

    {
      id: "agreement_raters",
      title: "Raters",
      question: "How many raters?",
      description:
        "Agreement measures differ depending on whether you have exactly two raters or many raters labeling the same items.",
      options: [
        {
          value: "two",
          label: "Two",
          description: "Exactly two raters/systems label each item (two doctors classify the same scans).",
          set_tags: { groups: "two" },
          next: "leaf",
        },
        {
          value: "three_plus",
          label: "Three or more",
          description: "Three or more raters/systems label each item (a panel of reviewers).",
          set_tags: { groups: "three_plus" },
          next: "leaf",
        },
      ],
    },

    {
      id: "model_outcome",
      title: "Outcome Type",
      question: "What is the outcome type?",
      description:
        "Models differ based on what kind of outcome you are trying to predict or explain (numeric, yes/no, counts, ordered categories, etc.).",
      options: [
        {
          value: "continuous",
          label: "Continuous",
          description: "A numeric outcome (price, blood pressure, test score).",
          set_tags: { outcome: "continuous" },
          next: "model_preference_cont",
        },
        {
          value: "binary",
          label: "Binary",
          description: "A yes/no outcome (churn vs not churn; disease vs no disease).",
          set_tags: { outcome: "binary" },
          next: "model_preference_bin",
        },
        {
          value: "count",
          label: "Count",
          description: "A non-negative integer outcome (number of visits, number of defects).",
          set_tags: { outcome: "count" },
          next: "clustered_data",
        },
        {
          value: "ordinal",
          label: "Ordinal",
          description:
            "Ordered categories (low/medium/high; 1–5 rating), where the order matters but spacing is not numeric.",
          set_tags: { outcome: "ordinal" },
          next: "leaf",
        },
        {
          value: "time_to_event",
          label: "Time-to-event",
          description: "Time until an event occurs, often with censoring (time until relapse, time until failure).",
          set_tags: { outcome: "time_to_event" },
          next: "leaf",
        },
        {
          value: "multivariate",
          label: "Multiple continuous outcomes",
          description: "You have several numeric outcomes you want to model together (multiple lab measurements at once).",
          set_tags: { outcome: "continuous", task: "multivariate_outcomes" },
          next: "leaf",
        },
      ],
    },

    {
      id: "model_preference_cont",
      title: "Modeling Preference",
      question: "What is your priority?",
      description:
        "Different approaches trade off interpretability vs predictive performance and can handle many predictors in different ways.",
      options: [
        {
          value: "interpretable",
          label: "Interpretable inference",
          description: "You care about understanding how predictors relate to the outcome (effect sizes, directions, p-values, confidence intervals).",
          set_tags: { modeling_preference: "interpretable" },
          next: "clustered_data",
        },
        {
          value: "regularized",
          label: "Regularized (many predictors)",
          description:
            "You have many predictors and want a model that shrinks or selects predictors to reduce overfitting (useful when predictors are numerous or correlated).",
          set_tags: { modeling_preference: "regularized" },
          next: "clustered_data",
        },
        {
          value: "predictive_ml",
          label: "Predictive ML (nonlinear)",
          description:
            "You mainly want accurate predictions and are okay with less interpretability (models can capture nonlinear patterns and interactions automatically).",
          set_tags: { modeling_preference: "predictive_ml" },
          next: "clustered_data",
        },
      ],
    },

    {
      id: "model_preference_bin",
      title: "Modeling Preference",
      question: "What is your priority?",
      description:
        "For yes/no outcomes, you can prioritize interpretability (logistic-type models) or predictive performance (ML models).",
      options: [
        {
          value: "interpretable",
          label: "Interpretable inference",
          description: "You want explainable effects (for example, odds ratios) and statistical inference on predictors.",
          set_tags: { modeling_preference: "interpretable" },
          next: "clustered_data",
        },
        {
          value: "predictive_ml",
          label: "Predictive ML (nonlinear)",
          description: "You mainly want strong classification performance, potentially using nonlinear patterns and interactions.",
          set_tags: { modeling_preference: "predictive_ml" },
          next: "clustered_data",
        },
      ],
    },

    {
      id: "clustered_data",
      title: "Dependence Structure",
      question: "Is the data clustered/repeated (subjects, sites, random effects)?",
      description:
        "If observations are not independent (repeated measures per subject or patients within hospitals), you often need models that account for that clustering.",
      options: [
        {
          value: "yes",
          label: "Yes",
          description: "Observations are grouped or repeated (multiple rows per person, multiple measurements per site).",
          set_tags: { design: "clustered" },
          next: "leaf",
        },
        {
          value: "no",
          label: "No",
          description: "Each observation is independent (one row per subject and subjects are unrelated).",
          set_tags: { design: "none" },
          next: "leaf",
        },
      ],
    },

    {
      id: "unsup_task",
      title: "Unsupervised Task",
      question: "What do you want to do?",
      description: "Unsupervised methods help you discover structure without a single target variable.",
      options: [
        {
          value: "clustering",
          label: "Clustering",
          description: "Group similar observations together (segment customers into similar behavior groups).",
          set_tags: { task: "clustering" },
          next: "leaf",
        },
        {
          value: "dim_reduction",
          label: "Dimension reduction / embedding",
          description: "Compress many variables into a smaller set while keeping as much information as possible (useful for visualization and noise reduction).",
          set_tags: { task: "dim_reduction" },
          next: "leaf",
        },
      ],
    },

    {
      id: "ts_task",
      title: "Time Series Task",
      question: "What is your primary time-series task?",
      description: "Time series analyses handle data collected over time and focus on forecasting, stability, and time-based relationships.",
      options: [
        {
          value: "forecasting",
          label: "Forecasting",
          description: "Predict future values based on past values (next month’s sales).",
          set_tags: { task: "forecasting" },
          next: "leaf",
        },
        {
          value: "stationarity",
          label: "Stationarity check",
          description: "Check whether the time series has stable statistical properties over time (important for many time-series models).",
          set_tags: { task: "stationarity" },
          next: "leaf",
        },
        {
          value: "model_adequacy",
          label: "Model adequacy / autocorrelation",
          description: "Check whether leftover patterns remain after fitting a model (whether residuals are still correlated over time).",
          set_tags: { task: "model_adequacy" },
          next: "leaf",
        },
        {
          value: "multivariate",
          label: "Multivariate dynamics",
          description: "Model multiple time series together to understand how they move jointly over time.",
          set_tags: { task: "multivariate_dynamics" },
          next: "leaf",
        },
        {
          value: "causality",
          label: "Causality between series",
          description:
            "Test whether past values of one series help predict another series beyond its own past (a practical notion often called Granger causality).",
          set_tags: { task: "causality" },
          next: "leaf",
        },
      ],
    },

    {
      id: "surv_task",
      title: "Survival Task",
      question: "What do you need?",
      description: "Survival analysis focuses on time-to-event data, often with censoring (not everyone has the event during the study).",
      options: [
        {
          value: "describe",
          label: "Describe survival curve",
          description: "Estimate and visualize the survival curve over time for one group (probability of remaining event-free).",
          set_tags: { task: "describe_survival", outcome: "time_to_event" },
          next: "leaf",
        },
        {
          value: "compare",
          label: "Compare survival curves",
          description: "Compare time-to-event between groups (treatment vs control survival curves).",
          set_tags: { task: "compare_survival", outcome: "time_to_event" },
          next: "leaf",
        },
        {
          value: "model",
          label: "Model survival with covariates",
          description: "Model how predictors relate to time-to-event (how age or dose affects hazard/risk).",
          set_tags: { task: "model_survival", outcome: "time_to_event" },
          next: "leaf",
        },
      ],
    },

    {
      id: "diag_task",
      title: "Diagnostics & Add-ons",
      question: "What do you need?",
      description: "These are supporting analyses: checking assumptions, correcting for multiple comparisons, doing post-hoc tests, or reporting effect sizes.",
      options: [
        {
          value: "normality",
          label: "Normality check",
          description: "Check whether data (or model residuals) are approximately bell-shaped. Some methods assume this; others do not.",
          set_tags: { diag: "normality" },
          next: "leaf",
        },
        {
          value: "equal_variance",
          label: "Equal variance check",
          description: "Check whether groups have similar variability (spread). Some group-comparison methods assume similar variances.",
          set_tags: { diag: "equal_variance" },
          next: "leaf",
        },
        {
          value: "autocorr",
          label: "Regression autocorrelation",
          description:
            "Check whether regression residuals are correlated with each other (common in time-ordered data). Autocorrelation can invalidate standard p-values.",
          set_tags: { diag: "autocorr" },
          next: "leaf",
        },
        {
          value: "heterosk",
          label: "Heteroskedasticity",
          description:
            "Check whether the variability of errors changes across the range of predictions (non-constant variance). This can affect standard errors and p-values.",
          set_tags: { diag: "heterosk" },
          next: "leaf",
        },
        {
          value: "multiple_testing",
          label: "Multiple testing correction",
          description:
            "If you run many statistical tests, false positives become more likely. Corrections adjust p-values or thresholds to control this.",
          set_tags: { diag: "multiple_testing" },
          next: "leaf",
        },
        {
          value: "posthoc",
          label: "Post-hoc comparisons",
          description:
            "After finding an overall difference across 3+ groups, post-hoc tests tell you which specific groups differ while controlling false positives.",
          set_tags: { diag: "posthoc" },
          next: "leaf",
        },
        {
          value: "effect_size",
          label: "Effect size",
          description: "Report how big an effect is (practical importance), not just whether it is statistically significant.",
          set_tags: { diag: "effect_size" },
          next: "leaf",
        },
      ],
    },
  ],

  recommendation_rules: [
    {
      id: "est_mean_onesample_t",
      when: { goal: "estimate", outcome: "continuous", task: "estimate_mean", test_against_mu0: "yes" },
      recommend: ["one-sample-t-test"],
      alternatives: ["wilcoxon-signed-rank", "bootstrap", "permutation-test", "bayesian-t-test"],
      add_ons: ["cohens-d", "shapiro-wilk"],
    },
    {
      id: "est_mean_ci_only",
      when: { goal: "estimate", outcome: "continuous", task: "estimate_mean", test_against_mu0: "no" },
      recommend: ["one-sample-t-test"],
      alternatives: ["bootstrap", "bayesian-t-test", "wilcoxon-signed-rank"],
      add_ons: ["cohens-d", "shapiro-wilk"],
    },
    {
      id: "est_prop_binomial_default",
      when: { goal: "estimate", outcome: "binary", task: "estimate_proportion" },
      recommend: ["binomial-test"],
      alternatives: ["one-proportion-z-test", "bootstrap"],
      add_ons: [],
    },

    {
      id: "cmp_cont_ind_2g_default",
      when: { goal: "compare_groups", outcome: "continuous", design: "independent", groups: "two" },
      recommend: ["welch-t-test"],
      alternatives: ["t-test-independent", "mann-whitney", "bayesian-t-test", "bootstrap", "permutation-test"],
      add_ons: ["cohens-d", "hedges-g", "shapiro-wilk"],
    },
    {
      id: "cmp_cont_paired_2g_default",
      when: { goal: "compare_groups", outcome: "continuous", design: "paired", groups: "two" },
      recommend: ["paired-t-test"],
      alternatives: ["wilcoxon-signed-rank", "bayesian-t-test", "bootstrap", "permutation-test"],
      add_ons: ["cohens-d", "hedges-g", "shapiro-wilk"],
    },
    {
      id: "cmp_cont_ind_3p_1factor_default",
      when: { goal: "compare_groups", outcome: "continuous", design: "independent", groups: "three_plus", factors: "one" },
      recommend: ["one-way-anova"],
      alternatives: ["welch-anova", "kruskal-wallis", "bayesian-anova", "bootstrap", "permutation-test"],
      add_ons: ["eta-squared", "omega-squared", "shapiro-wilk", "levene-test"],
    },
    {
      id: "cmp_cont_ind_3p_2plusFactors",
      when: { goal: "compare_groups", outcome: "continuous", design: "independent", groups: "three_plus", factors: "two_plus" },
      recommend: ["two-way-anova"],
      alternatives: ["ancova", "manova", "bayesian-anova"],
      add_ons: ["eta-squared", "omega-squared", "shapiro-wilk", "levene-test"],
    },
    {
      id: "cmp_cont_rep_3p_default",
      when: { goal: "compare_groups", outcome: "continuous", design: "repeated", groups: "three_plus" },
      recommend: ["repeated-measures-anova"],
      alternatives: ["friedman-test", "linear-mixed-model", "bayesian-anova", "bootstrap", "permutation-test"],
      add_ons: ["eta-squared", "omega-squared", "epsilon-squared", "shapiro-wilk"],
    },

    {
      id: "cmp_cat_paired_binary",
      when: { goal: "compare_groups", outcome: "binary", design: "paired" },
      recommend: ["mcnemar-test"],
      alternatives: ["cochran-q"],
      add_ons: ["odds-ratio", "risk-difference"],
    },
    {
      id: "cmp_cat_ind_2x2_default",
      when: { goal: "compare_groups", outcome: "categorical", design: "independent", groups: "two" },
      recommend: ["chi-square-2x2"],
      alternatives: ["two-proportion-z-test", "fisher-exact"],
      add_ons: ["odds-ratio", "risk-ratio", "risk-difference", "phi-coefficient", "cramers-v"],
    },
    {
      id: "cmp_cat_ind_rxc",
      when: { goal: "compare_groups", outcome: "categorical", design: "independent", groups: "three_plus" },
      recommend: ["chi-square"],
      alternatives: ["fisher-freeman-halton"],
      add_ons: ["cramers-v"],
    },

    {
      id: "assoc_contcont_default",
      when: { goal: "association", assoc_pair: "cont_cont", control_vars: "no" },
      recommend: ["spearman-correlation"],
      alternatives: ["pearson-correlation", "kendall-tau"],
      add_ons: [],
    },
    {
      id: "assoc_contcont_control_vars",
      when: { goal: "association", assoc_pair: "cont_cont", control_vars: "yes" },
      recommend: ["partial-correlation"],
      alternatives: ["spearman-correlation", "pearson-correlation", "kendall-tau"],
      add_ons: [],
    },
    {
      id: "assoc_bin_cont",
      when: { goal: "association", assoc_pair: "bin_cont" },
      recommend: ["point-biserial"],
      alternatives: [],
      add_ons: [],
    },

    {
      id: "cat_assoc_independence_default",
      when: { goal: "categorical_association", task: "independence_test" },
      recommend: ["chi-square"],
      alternatives: ["fisher-exact", "fisher-freeman-halton"],
      add_ons: ["cramers-v", "odds-ratio"],
    },
    {
      id: "cat_assoc_agreement_2",
      when: { goal: "categorical_association", task: "agreement", groups: "two" },
      recommend: ["cohens-kappa"],
      alternatives: [],
      add_ons: [],
    },
    {
      id: "cat_assoc_agreement_3p",
      when: { goal: "categorical_association", task: "agreement", groups: "three_plus" },
      recommend: ["fleiss-kappa"],
      alternatives: [],
      add_ons: [],
    },
    {
      id: "cat_assoc_effect_size",
      when: { goal: "categorical_association", task: "effect_size" },
      recommend: ["cramers-v"],
      alternatives: ["odds-ratio", "phi-coefficient"],
      add_ons: [],
    },

    {
      id: "model_cont_interpretable",
      when: { goal: "model_with_predictors", outcome: "continuous", modeling_preference: "interpretable", design: "none" },
      recommend: ["multiple-regression"],
      alternatives: ["linear-regression", "robust-regression", "quantile-regression", "bayesian-regression"],
      add_ons: ["vif", "breusch-pagan", "durbin-watson"],
    },
    {
      id: "model_cont_regularized",
      when: { goal: "model_with_predictors", outcome: "continuous", modeling_preference: "regularized", design: "none" },
      recommend: ["elastic-net"],
      alternatives: ["lasso-ridge"],
      add_ons: ["cross-validation"],
    },
    {
      id: "model_cont_predictive",
      when: { goal: "model_with_predictors", outcome: "continuous", modeling_preference: "predictive_ml", design: "none" },
      recommend: ["random-forest"],
      alternatives: ["gradient-boosting", "xgboost", "lightgbm", "catboost", "svm", "knn", "decision-tree", "neural-network-mlp"],
      add_ons: ["cross-validation"],
    },
    {
      id: "model_bin_interpretable",
      when: { goal: "model_with_predictors", outcome: "binary", modeling_preference: "interpretable", design: "none" },
      recommend: ["logistic-regression"],
      alternatives: ["probit-regression", "bayesian-regression"],
      add_ons: ["odds-ratio", "vif"],
    },
    {
      id: "model_bin_predictive",
      when: { goal: "model_with_predictors", outcome: "binary", modeling_preference: "predictive_ml", design: "none" },
      recommend: ["random-forest"],
      alternatives: ["gradient-boosting", "xgboost", "lightgbm", "catboost", "svm", "knn", "decision-tree", "naive-bayes", "neural-network-mlp"],
      add_ons: ["cross-validation"],
    },
    {
      id: "model_bin_clustered",
      when: { goal: "model_with_predictors", outcome: "binary", design: "clustered" },
      recommend: ["glmm"],
      alternatives: ["gee", "logistic-regression"],
      add_ons: ["odds-ratio"],
    },
    {
      id: "model_count_default",
      when: { goal: "model_with_predictors", outcome: "count", design: "none" },
      recommend: ["poisson-regression"],
      alternatives: ["negative-binomial", "zero-inflated-poisson"],
      add_ons: ["vif"],
    },
    {
      id: "model_count_clustered",
      when: { goal: "model_with_predictors", outcome: "count", design: "clustered" },
      recommend: ["glmm"],
      alternatives: ["negative-binomial", "poisson-regression", "gee"],
      add_ons: [],
    },
    {
      id: "model_ordinal",
      when: { goal: "model_with_predictors", outcome: "ordinal" },
      recommend: ["ordinal-regression"],
      alternatives: [],
      add_ons: ["vif"],
    },
    {
      id: "model_survival",
      when: { goal: "model_with_predictors", outcome: "time_to_event" },
      recommend: ["cox-regression"],
      alternatives: ["accelerated-failure-time", "random-survival-forest"],
      add_ons: ["kaplan-meier"],
    },
    {
      id: "model_multivariate_outcomes",
      when: { goal: "model_with_predictors", task: "multivariate_outcomes" },
      recommend: ["manova"],
      alternatives: [],
      add_ons: [],
    },
    {
      id: "model_clustered_cont",
      when: { goal: "model_with_predictors", outcome: "continuous", design: "clustered" },
      recommend: ["linear-mixed-model"],
      alternatives: ["bayesian-regression"],
      add_ons: [],
    },

    {
      id: "unsup_cluster",
      when: { goal: "unsupervised", task: "clustering" },
      recommend: ["kmeans"],
      alternatives: ["hierarchical-clustering", "dbscan", "gaussian-mixture"],
      add_ons: ["pca"],
    },
    {
      id: "unsup_dimred",
      when: { goal: "unsupervised", task: "dim_reduction" },
      recommend: ["pca"],
      alternatives: ["factor-analysis", "tsne", "umap"],
      add_ons: [],
    },

    {
      id: "ts_forecast",
      when: { goal: "time_series", task: "forecasting" },
      recommend: ["arima"],
      alternatives: ["exponential-smoothing", "prophet"],
      add_ons: ["ljung-box", "adf-test"],
    },
    {
      id: "ts_stationarity",
      when: { goal: "time_series", task: "stationarity" },
      recommend: ["adf-test"],
      alternatives: [],
      add_ons: [],
    },
    {
      id: "ts_adequacy",
      when: { goal: "time_series", task: "model_adequacy" },
      recommend: ["ljung-box"],
      alternatives: [],
      add_ons: [],
    },
    {
      id: "ts_var",
      when: { goal: "time_series", task: "multivariate_dynamics" },
      recommend: ["var"],
      alternatives: [],
      add_ons: ["granger-causality"],
    },
    {
      id: "ts_granger",
      when: { goal: "time_series", task: "causality" },
      recommend: ["granger-causality"],
      alternatives: ["var"],
      add_ons: [],
    },

    {
      id: "surv_describe",
      when: { goal: "survival", task: "describe_survival" },
      recommend: ["kaplan-meier"],
      alternatives: [],
      add_ons: [],
    },
    {
      id: "surv_compare",
      when: { goal: "survival", task: "compare_survival" },
      recommend: ["log-rank-test"],
      alternatives: [],
      add_ons: ["kaplan-meier"],
    },
    {
      id: "surv_model",
      when: { goal: "survival", task: "model_survival" },
      recommend: ["cox-regression"],
      alternatives: ["accelerated-failure-time", "competing-risks", "random-survival-forest"],
      add_ons: ["kaplan-meier"],
    },

    {
      id: "power",
      when: { goal: "power_planning", task: "power_sample_size" },
      recommend: ["power-analysis"],
      alternatives: [],
      add_ons: [],
    },

    {
      id: "diag_normality",
      when: { goal: "diagnostics_posthoc_effectsize", diag: "normality" },
      recommend: ["shapiro-wilk"],
      alternatives: ["anderson-darling", "dagostino-pearson", "kolmogorov-smirnov"],
      add_ons: [],
    },
    {
      id: "diag_equal_var",
      when: { goal: "diagnostics_posthoc_effectsize", diag: "equal_variance" },
      recommend: ["levene-test"],
      alternatives: ["brown-forsythe", "bartlett-test", "fligner-killeen", "hartley-fmax"],
      add_ons: [],
    },
    {
      id: "diag_autocorr",
      when: { goal: "diagnostics_posthoc_effectsize", diag: "autocorr" },
      recommend: ["durbin-watson"],
      alternatives: ["ljung-box"],
      add_ons: [],
    },
    {
      id: "diag_heterosk",
      when: { goal: "diagnostics_posthoc_effectsize", diag: "heterosk" },
      recommend: ["breusch-pagan"],
      alternatives: [],
      add_ons: [],
    },
    {
      id: "diag_multiple_testing",
      when: { goal: "diagnostics_posthoc_effectsize", diag: "multiple_testing" },
      recommend: ["holm-bonferroni"],
      alternatives: ["bonferroni", "benjamini-hochberg"],
      add_ons: [],
    },
    {
      id: "diag_posthoc_anova",
      when: { goal: "diagnostics_posthoc_effectsize", diag: "posthoc" },
      recommend: ["tukey-hsd"],
      alternatives: ["games-howell", "scheffe-test", "dunnett-test", "dunn-test"],
      add_ons: [],
    },
    {
      id: "diag_effect_size",
      when: { goal: "diagnostics_posthoc_effectsize", diag: "effect_size" },
      recommend: ["cohens-d"],
      alternatives: ["hedges-g", "eta-squared", "omega-squared", "epsilon-squared", "odds-ratio", "cramers-v", "rank-biserial", "phi-coefficient"],
      add_ons: [],
    },
    {
      id: "diag_default",
      when: { goal: "diagnostics_posthoc_effectsize" },
      recommend: ["shapiro-wilk"],
      alternatives: ["levene-test", "breusch-pagan", "durbin-watson"],
      add_ons: [],
    },
  ],

  leaf_resolution: {
    strategy: "first_match_with_most_specificity",
    tie_breakers: ["more_keys_in_when", "prefer_rules_order"],
    fallback: {
      recommend: [],
      alternatives: [],
      add_ons: [],
      message: "No exact match. Consider browsing all tests or adjusting inputs.",
    },
  },
};