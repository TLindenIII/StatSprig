export interface GlossaryTerm {
  term: string;
  definition: string;
  category?: string;
  relatedTerms?: string[];
  aliases?: string[];
}

export const glossaryTerms: GlossaryTerm[] = [
  // --- Inference + reporting ---
  {
    term: "Significance Level (α)",
    definition:
      "A pre-specified threshold used to decide whether a result is statistically significant; it controls the long-run Type I error rate for a single test (commonly 0.05).",
    category: "Inference",
    relatedTerms: ["Type I Error", "Statistical Significance", "P-value"],
  },
  {
    term: "Statistical Significance",
    definition:
      "A decision that an observed result is unlikely under the null hypothesis, usually determined by comparing a p-value to a significance level (α).",
    category: "Inference",
    relatedTerms: ["P-value", "Significance Level (α)", "Null Hypothesis"],
    aliases: ["Statistically Significant"],
  },
  {
    term: "Practical Significance",
    definition:
      "Whether an effect is large enough to matter in real-world or domain terms, regardless of statistical significance.",
    category: "Inference",
    relatedTerms: ["Effect Size", "Statistical Significance", "Confidence Interval"],
  },
  {
    term: "Effect Size",
    definition:
      "A quantitative measure of the magnitude of a relationship or difference (e.g., standardized mean difference, correlation strength), distinct from p-values.",
    category: "Inference",
    relatedTerms: ["Practical Significance", "Confidence Interval", "Statistical Significance"],
    aliases: ["Effect Sizes"],
  },
  {
    term: "Power",
    definition:
      "The probability that a study will detect a specified effect (i.e., reject the null) when the effect is truly present; equals 1 − Type II error rate.",
    category: "Power & Planning",
    relatedTerms: ["Type II Error", "Effect Size", "Sample Size"],
  },
  {
    term: "Multiple Comparisons",
    definition:
      "Performing many statistical tests on the same dataset, which increases the chance of false positives unless adjustments are used.",
    category: "Inference",
    relatedTerms: ["Family-wise Error Rate (FWER)", "False Discovery Rate (FDR)"],
    aliases: ["Multiple Comparison"],
  },
  {
    term: "Family-wise Error Rate (FWER)",
    definition:
      "The probability of making at least one Type I error (false positive) across a set (family) of tests.",
    category: "Inference",
    relatedTerms: ["Multiple Comparisons", "Type I Error"],
    aliases: ["FWER"],
  },
  {
    term: "False Discovery Rate (FDR)",
    definition:
      "The expected proportion of false positives among results declared significant (discoveries).",
    category: "Inference",
    relatedTerms: ["Multiple Comparisons", "Type I Error"],
  },
  {
    term: "Confidence Level",
    definition:
      "The long-run proportion of confidence intervals that would contain the true parameter if the procedure were repeated many times (e.g., 95%).",
    category: "Estimation",
    relatedTerms: ["Confidence Interval"],
  },

  // --- Study design + data structure ---
  {
    term: "Independent Observations",
    definition:
      "Measurements are independent when knowing one observation gives no information about another; violations commonly occur with repeated measures or clustered data.",
    category: "Design",
    relatedTerms: ["Repeated Measures", "Clustered Data"],
  },
  {
    term: "Independent Samples",
    definition:
      "Groups are independent when the observations in one group are not paired or linked to observations in another group.",
    category: "Design",
    relatedTerms: ["Paired Data", "Independent Observations"],
    aliases: ["Independent Groups", "Independent Group"],
  },
  {
    term: "Paired Data",
    definition:
      "Observations are paired when each measurement in one condition/group is linked to a specific measurement in another (e.g., pre/post on the same subject, matched pairs).",
    category: "Design",
    relatedTerms: ["Repeated Measures", "Independent Samples"],
    aliases: ["Paired Measures", "Paired Measure"],
  },
  {
    term: "Repeated Measures",
    definition:
      "Data where multiple observations are collected from the same unit (person, item, site) across time or conditions, creating within-unit correlation.",
    category: "Design",
    relatedTerms: ["Independent Observations", "Clustered Data"],
    aliases: ["Repeated Measurements", "Repeated Measurement"],
  },
  {
    term: "Clustered Data",
    definition:
      "Data where observations are grouped into clusters (e.g., students within classes), often leading to correlation within each cluster.",
    category: "Design",
    relatedTerms: ["Random Effects", "Fixed Effects", "Repeated Measures"],
  },
  {
    term: "Covariate",
    definition:
      "An additional variable included in an analysis/model to adjust for differences or explain variation in the outcome.",
    category: "Design",
    relatedTerms: ["Confounder", "Predictor"],
    aliases: ["Covariates"],
  },
  {
    term: "Confounder",
    definition:
      "A variable associated with both the predictor and the outcome that can distort (bias) the estimated relationship if not controlled for.",
    category: "Design",
    relatedTerms: ["Covariate", "Bias"],
  },
  {
    term: "Fixed Effects",
    definition:
      "Model effects interpreted as applying to the specific levels in the dataset (e.g., particular clinics), often treated as non-random parameters.",
    category: "Modeling",
    relatedTerms: ["Random Effects", "Clustered Data"],
  },
  {
    term: "Random Effects",
    definition:
      "Model terms representing cluster-level variability as draws from a distribution, used to account for correlation in clustered or repeated-measures data.",
    category: "Modeling",
    relatedTerms: ["Fixed Effects", "Clustered Data", "Mixed Models"],
  },

  // --- Assumptions + diagnostics ---
  {
    term: "Normality",
    definition:
      "An assumption that a variable (often model residuals or paired differences) follows a normal distribution; many methods are robust to mild deviations with adequate sample size.",
    category: "Assumptions",
    relatedTerms: ["Normal Distribution", "Residuals"],
  },
  {
    term: "Homoscedasticity",
    definition:
      "An assumption that variability (variance) is roughly constant across predictor values or groups; also called equal variance.",
    category: "Assumptions",
    relatedTerms: ["Heteroskedasticity", "Residuals"],
  },
  {
    term: "Heteroskedasticity",
    definition:
      "Non-constant variance across predictor values or groups; it can distort standard errors and inference if unaddressed.",
    category: "Assumptions",
    relatedTerms: ["Homoscedasticity", "Standard Error"],
  },
  {
    term: "Outlier",
    definition:
      "An observation far from the bulk of the data; it may be a data issue or a valid extreme case and can strongly affect some analyses.",
    category: "Diagnostics",
    relatedTerms: ["Influential Point", "Leverage"],
  },
  {
    term: "Leverage",
    definition:
      "How unusual an observation’s predictor values are relative to the dataset; high-leverage points can strongly affect fitted models.",
    category: "Diagnostics",
    relatedTerms: ["Influential Point", "Outlier"],
  },
  {
    term: "Influential Point",
    definition:
      "A data point that substantially changes model estimates or predictions if removed; often related to leverage and residual size.",
    category: "Diagnostics",
    relatedTerms: ["Leverage", "Outlier", "Residuals"],
  },
  {
    term: "Multicollinearity",
    definition:
      "High correlation among predictors in a model, which can make individual coefficient estimates unstable and inflate standard errors.",
    category: "Diagnostics",
    relatedTerms: ["Predictor", "Standard Error"],
  },
  {
    term: "Overdispersion",
    definition:
      "For count data, when the variance exceeds the mean; this can indicate that a simple Poisson model is too restrictive.",
    category: "Assumptions",
    relatedTerms: ["Count Outcome", "Poisson Regression", "Negative Binomial Regression"],
  },

  // --- Multiple-testing adjustments (methods, not tests) ---
  {
    term: "Post-hoc Comparison",
    definition:
      "A follow-up comparison conducted after an overall analysis indicates differences exist; typically paired with multiple-comparisons control.",
    category: "Inference",
    relatedTerms: [
      "Multiple Comparisons",
      "Family-wise Error Rate (FWER)",
      "False Discovery Rate (FDR)",
    ],
    aliases: ["Post-hoc", "Post-hoc test", "Post-hoc tests", "Post hoc"],
  },

  // --- Regression + GLM-family (models, not tests page content) ---
  {
    term: "Mixed Models",
    definition:
      "Models that include both fixed effects and random effects to handle clustered or repeated-measures data (e.g., LMM/GLMM).",
    category: "Modeling",
    relatedTerms: ["Fixed Effects", "Random Effects", "Clustered Data", "Repeated Measures"],
  },

  // --- Survival concepts (non-test terms) ---
  {
    term: "Censoring",
    definition:
      "In time-to-event data, censoring occurs when the event is not observed for some units during the study period (e.g., study ends before the event).",
    category: "Survival",
    relatedTerms: ["Time-to-Event Outcome"],
  },
  {
    term: "Proportional Hazards Assumption",
    definition:
      "An assumption that the hazard ratio between groups (or per predictor change) is constant over time, commonly used in Cox modeling.",
    category: "Survival",
    relatedTerms: ["Hazard", "Hazard Ratio"],
  },
  {
    term: "Competing Risks",
    definition:
      "A survival setting where multiple event types are possible and the occurrence of one type prevents the others from occurring.",
    category: "Survival",
    relatedTerms: ["Censoring", "Time-to-Event Outcome"],
  },

  // --- Time series concepts (non-test terms) ---
  {
    term: "Stationarity",
    definition:
      "A time series property where key characteristics (like mean and variance) are stable over time; many classical time-series models rely on it.",
    category: "Time Series",
    relatedTerms: ["Autocorrelation", "Seasonality", "Lag"],
    aliases: ["Stationary", "Stationary Series"],
  },
  {
    term: "Seasonality",
    definition:
      "A repeating pattern in a time series that occurs at a regular interval, such as weekly, monthly, or yearly cycles.",
    category: "Time Series",
    relatedTerms: ["Forecasting", "Seasonal Differencing", "Stationarity"],
    aliases: ["Seasonal Pattern", "Seasonal Patterns"],
  },
  {
    term: "Lag",
    definition:
      "A previous time point used as a reference in time-series analysis, such as the value one period ago or twelve periods ago.",
    category: "Time Series",
    relatedTerms: ["Autocorrelation", "Autocorrelation Function", "Partial Autocorrelation Function"],
    aliases: ["Lags", "Lagged Value", "Lagged Values"],
  },
  {
    term: "Autocorrelation",
    definition:
      "Correlation of a time series with its own past values; important for diagnosing and modeling time-dependent structure.",
    category: "Time Series",
    relatedTerms: ["Stationarity"],
  },
  {
    term: "Differencing",
    definition:
      "Transforming a series by subtracting a previous value to reduce trend or other nonstationary structure before modeling.",
    category: "Time Series",
    relatedTerms: ["Stationarity", "Seasonal Differencing", "Residuals"],
    aliases: ["Difference"],
  },
  {
    term: "Seasonal Differencing",
    definition:
      "Subtracting each observation from the value one full season earlier (for example, 12 months ago) to reduce seasonal nonstationarity.",
    category: "Time Series",
    relatedTerms: ["Differencing", "Stationarity", "Forecasting"],
  },
  {
    term: "White Noise",
    definition:
      "A series with no systematic pattern left in the mean; well-behaved forecast model residuals are often expected to look roughly like white noise.",
    category: "Time Series",
    relatedTerms: ["Autocorrelation", "Residuals", "Diagnostics"],
  },
  {
    term: "Autocorrelation Function",
    definition:
      "A summary of correlations between a series and its lagged values across multiple lags; often abbreviated ACF.",
    category: "Time Series",
    relatedTerms: ["Autocorrelation", "Partial Autocorrelation Function", "Stationarity"],
    aliases: ["ACF"],
  },
  {
    term: "Partial Autocorrelation Function",
    definition:
      "Correlation between a series and a lag after adjusting for shorter lags; often abbreviated PACF and used heuristically in ARIMA order selection.",
    category: "Time Series",
    relatedTerms: ["Autocorrelation Function", "Autocorrelation", "Forecasting"],
    aliases: ["PACF"],
  },
  {
    term: "Forecast Interval",
    definition:
      "A range of plausible future values from a forecasting model; its calibration depends on the model and on how well the residual assumptions hold.",
    category: "Time Series",
    relatedTerms: ["Forecasting", "Residuals", "Variance"],
    aliases: ["Forecast Intervals"],
  },

  // --- Dimension reduction + clustering (concepts) ---
  {
    term: "Dimensionality Reduction",
    definition:
      "Techniques that represent data using fewer variables (dimensions) while preserving important structure, often for visualization or modeling efficiency.",
    category: "Unsupervised",
    relatedTerms: ["PCA", "Embedding"],
    aliases: ["Dimension Reduction", "Dimension Reductions"],
  },
  {
    term: "Principal Component",
    definition:
      "A new variable created as a weighted combination of original variables, chosen to capture as much variance as possible (in order).",
    category: "Unsupervised",
    relatedTerms: ["PCA", "Variance"],
  },
  {
    term: "Cluster",
    definition:
      "A group of observations that are more similar to each other than to observations in other groups, as identified by a clustering method.",
    category: "Unsupervised",
    relatedTerms: ["Clustering", "Distance Metric"],
    aliases: ["Clusters"],
  },
  {
    term: "Clustering",
    definition:
      "Unsupervised methods that group observations based on similarity without using labeled outcomes.",
    category: "Unsupervised",
    relatedTerms: ["Cluster", "Distance Metric"],
  },
  {
    term: "Distance Metric",
    definition:
      "A rule for measuring similarity/dissimilarity between observations (e.g., Euclidean distance), used heavily in clustering and k-NN-style methods.",
    category: "Unsupervised",
    relatedTerms: ["Clustering"],
  },

  // --- ML evaluation / general modeling concepts (non-test entries) ---
  {
    term: "Training Set",
    definition: "The subset of data used to fit a model’s parameters.",
    category: "Machine Learning",
    relatedTerms: ["Validation Set", "Test Set", "Data Leakage"],
  },
  {
    term: "Validation Set",
    definition:
      "A subset of data used during model development to tune settings (hyperparameters) and select models, separate from the final test set.",
    category: "Machine Learning",
    relatedTerms: ["Training Set", "Test Set", "Cross-Validation"],
  },
  {
    term: "Test Set",
    definition:
      "A held-out subset of data used once at the end to estimate out-of-sample performance after model selection is complete.",
    category: "Machine Learning",
    relatedTerms: ["Training Set", "Validation Set", "Data Leakage"],
  },
  {
    term: "Overfitting",
    definition:
      "When a model learns patterns specific to the training data (including noise) and performs worse on new data.",
    category: "Machine Learning",
    relatedTerms: ["Regularization", "Cross-Validation"],
  },
  {
    term: "Regularization",
    definition:
      "Techniques that constrain model complexity to reduce overfitting (e.g., penalties on coefficient size).",
    category: "Machine Learning",
    relatedTerms: ["Overfitting"],
  },
  {
    term: "Data Leakage",
    definition:
      "When information from outside the training process (e.g., from a test/validation set or future data) accidentally influences model training or feature creation, inflating performance estimates.",
    category: "Machine Learning",
    relatedTerms: ["Training Set", "Validation Set", "Test Set"],
  },

  // --- Shared “types” used throughout the wizard ---
  {
    term: "Continuous Outcome",
    definition:
      "An outcome measured on a numeric scale with many possible values (e.g., height, time, temperature).",
    category: "Data Types",
    relatedTerms: ["Binary Outcome", "Count Outcome", "Ordinal Outcome"],
    aliases: ["Continuous", "Continuous Variable", "Continuous Variables"],
  },
  {
    term: "Binary Outcome",
    definition: "An outcome with exactly two possible values (e.g., yes/no, success/failure).",
    category: "Data Types",
    relatedTerms: ["Continuous Outcome", "Count Outcome", "Ordinal Outcome"],
    aliases: ["Binary", "Binaries"],
  },
  {
    term: "Count Outcome",
    definition: "An outcome representing non-negative integer counts (e.g., number of events).",
    category: "Data Types",
    relatedTerms: ["Overdispersion"],
  },
  {
    term: "Ordinal Outcome",
    definition:
      "A categorical outcome with an inherent order (e.g., low/medium/high; Likert scale).",
    category: "Data Types",
    relatedTerms: ["Ordinal Logistic Regression"],
    aliases: ["Ordinal", "Ordinals"],
  },
  {
    term: "Time-to-Event Outcome",
    definition:
      "An outcome representing the time until an event occurs (e.g., time to relapse), often with censoring.",
    category: "Data Types",
    relatedTerms: ["Censoring"],
    aliases: ["Time-to-Event", "Time to Event"],
  },

  // --- Small but useful terms referenced by the above ---
  {
    term: "Residuals",
    definition:
      "The differences between observed outcomes and model-predicted values; residual behavior is central to many diagnostics.",
    category: "Diagnostics",
    relatedTerms: ["Homoscedasticity", "Normality", "Influential Point"],
  },
  {
    term: "Standard Error",
    definition:
      "A measure of uncertainty in an estimated quantity (like a mean or regression coefficient), reflecting sampling variability.",
    category: "Estimation",
    relatedTerms: ["Confidence Interval"],
  },
  {
    term: "Sample Size",
    definition:
      "The number of observations (or experimental units) included in an analysis; larger samples typically reduce uncertainty.",
    category: "Power & Planning",
    relatedTerms: ["Power", "Standard Error", "Effect Size"],
  },
  {
    term: "Predictor",
    definition:
      "An input variable used to explain or predict an outcome in a model (also called an independent variable or feature).",
    category: "Modeling",
    relatedTerms: ["Covariate", "Multicollinearity"],
    aliases: ["Predictors"],
  },
  {
    term: "Bias",
    definition:
      "Systematic error that shifts estimates away from the true value (e.g., from confounding, selection effects, or measurement error).",
    category: "Inference",
    relatedTerms: ["Confounder"],
  },
  {
    term: "Hazard",
    definition:
      "In survival analysis, the instantaneous event rate at a given time, conditional on having survived up to that time.",
    category: "Survival",
    relatedTerms: ["Hazard Ratio", "Time-to-Event Outcome"],
  },
  {
    term: "Hazard Ratio",
    definition:
      "A relative measure comparing hazards between groups (or per unit change in a predictor); values >1 indicate higher hazard in the numerator group.",
    category: "Survival",
    relatedTerms: ["Hazard", "Proportional Hazards Assumption"],
  },
  {
    term: "Variance",
    definition:
      "A measure of spread describing how far values tend to deviate from the mean; it is the square of the standard deviation.",
    category: "Foundations",
    relatedTerms: ["Standard Deviation", "Principal Component"],
    aliases: ["Variances"],
  },
  {
    term: "Standard Deviation",
    definition:
      "The square root of variance; a common measure of spread on the original scale of the data.",
    category: "Foundations",
    relatedTerms: ["Variance"],
  },
  {
    term: "Embedding",
    definition:
      "A mapping from high-dimensional data into a lower-dimensional space intended to preserve meaningful structure (often for visualization or downstream modeling).",
    category: "Unsupervised",
    relatedTerms: ["Dimensionality Reduction"],
    aliases: ["Embeddings"],
  },
  {
    term: "Assumption",
    definition:
      "A condition or mathematical requirement that should be met for a statistical test or model to yield valid results.",
    category: "Assumptions",
    aliases: ["Assumptions"],
    relatedTerms: ["Diagnostics", "Robust"],
  },
  {
    term: "Outcome",
    definition:
      "The variable being predicted, modeled, or analyzed; often called the dependent variable or response.",
    category: "Data Types",
    aliases: ["Outcomes"],
    relatedTerms: [
      "Predictor",
      "Continuous Outcome",
      "Binary Outcome",
      "Count Outcome",
      "Ordinal Outcome",
      "Time-to-Event Outcome",
    ],
  },
  {
    term: "Study Design",
    definition:
      "The overarching strategy or framework chosen to integrate the different components of the study in a coherent and logical way.",
    category: "Design",
    aliases: ["Design", "Designs"],
    relatedTerms: ["Group Comparison", "Repeated Measures", "Independent Samples"],
  },
  {
    term: "Data Structure",
    definition:
      "The format and organization of the data, which dictates what kinds of statistical models are appropriate.",
    category: "Data Types",
    aliases: ["Structure", "Structures"],
    relatedTerms: ["Study Design"],
  },
  {
    term: "Group Comparison",
    definition:
      "A statistical analysis that tests for differences in an outcome variable between two or more groups.",
    category: "Inference",
    aliases: ["Group Comparisons"],
    relatedTerms: ["Study Design", "Effect Size"],
  },
  {
    term: "Non-parametric",
    definition:
      "Statistical methods that do not require the data to fit a known parameterized distribution (like normal).",
    category: "Inference",
    aliases: ["Non-parametric", "Non-parametric tests"],
    relatedTerms: ["Parametric", "Distribution", "Robust"],
  },
  {
    term: "Parametric",
    definition:
      "Statistical methods that assume the data follow a particular parameterized distribution (like the normal distribution).",
    category: "Inference",
    aliases: ["Parametric", "Parametric tests"],
    relatedTerms: ["Non-parametric", "Distribution", "Gaussian"],
  },
  {
    term: "Parameter",
    definition:
      "A numerical value that describes a characteristic of an entire population. Parameters summarize the whole group, are usually unknown, and are often estimated using sample statistics. Common examples include the population mean, population standard deviation, and population proportion.",
    category: "Foundations",
    aliases: ["Parameters"],
    relatedTerms: ["Mean", "Variance", "Proportion"],
  },
  {
    term: "Mean",
    definition:
      "The arithmetic average of a set of numbers, calculated by summing them and dividing by the count.",
    category: "Foundations",
    aliases: ["Means"],
    relatedTerms: ["Median", "Variance", "Spread"],
  },
  {
    term: "Proportion",
    definition:
      "A fraction or percentage representing the share of a specific category within a whole.",
    category: "Foundations",
    aliases: ["Proportions"],
    relatedTerms: ["Binary Outcome", "Count"],
  },
  {
    term: "Confidence Interval",
    definition:
      "A range of values, derived from sample statistics, that is likely to contain the value of an unknown population parameter.",
    category: "Inference",
    aliases: ["Confidence Intervals"],
    relatedTerms: ["P-value", "Statistical Significance", "Confidence Level"],
  },
  {
    term: "Reference Value",
    definition: "A baseline or hypothesized value against which a sample statistic is compared.",
    category: "Inference",
    aliases: ["Reference Values"],
    relatedTerms: ["P-value", "Null Distribution"],
  },
  {
    term: "Treatment",
    definition: "In an experiment, the specific condition applied to the individuals or subjects.",
    category: "Design",
    aliases: ["Treatments", "Treatment groups"],
    relatedTerms: ["Control", "Effect", "Study Design"],
  },
  {
    term: "Control",
    definition:
      "A baseline group in an experiment that does not receive the experimental treatment.",
    category: "Design",
    aliases: ["Controls", "Control group", "Control groups"],
    relatedTerms: ["Treatment", "Study Design"],
  },
  {
    term: "Association",
    definition:
      "A relationship between two or more variables where changes in one are related to changes in another.",
    category: "Inference",
    aliases: ["Associations"],
    relatedTerms: ["Correlation", "Causality", "Independence"],
  },
  {
    term: "Correlation",
    definition:
      "A statistical measure expressing the extent to which two variables change together at a constant rate.",
    category: "Correlation",
    aliases: ["Correlations"],
    relatedTerms: ["Association", "Correlated", "Covariate"],
  },
  {
    term: "Agreement",
    definition:
      "The degree to which two or more raters or measurement methods yield the same results.",
    category: "Diagnostics",
    aliases: ["Agreements"],
    relatedTerms: ["Rater"],
  },
  {
    term: "Contingency Table",
    definition: "A matrix that displays the frequency distribution of categorical variables.",
    category: "Data Types",
    aliases: ["Contingency Tables"],
    relatedTerms: ["Category", "Association"],
  },
  {
    term: "Rater",
    definition:
      "An individual who assigns scores, categories, or labels to subjects or items in a study.",
    category: "Design",
    aliases: ["Raters"],
    relatedTerms: ["Agreement"],
  },
  {
    term: "Label",
    definition:
      "A categorical target or class assigned to an observation in machine learning or statistics.",
    category: "Data Types",
    aliases: ["Labels"],
    relatedTerms: ["Classification", "Category"],
  },
  {
    term: "Model",
    definition: "A mathematical representation of the relationship between variables.",
    category: "Modeling",
    aliases: ["Models"],
    relatedTerms: ["Regression", "Classification", "Predictive"],
  },
  {
    term: "Regression",
    definition:
      "A statistical process for estimating the relationships between a dependent variable and independent variables.",
    category: "Modeling",
    aliases: ["Regressions"],
    relatedTerms: ["Model", "Continuous Outcome", "Predictor"],
  },
  {
    term: "Classification",
    definition: "A modeling problem where the target variable is a discrete category or class.",
    category: "Machine Learning",
    aliases: ["Classifications"],
    relatedTerms: ["Model", "Binary Outcome", "Category", "Label"],
  },
  {
    term: "Forecasting",
    definition:
      "The process of making predictions about the future based on past and present time series data.",
    category: "Time Series",
    aliases: ["Forecast", "Forecasts"],
    relatedTerms: ["Temporal", "Series", "Predictive"],
  },
  {
    term: "Diagnostics",
    definition:
      "Procedures used to check whether a fitted model adequately represents the data and meets assumptions.",
    category: "Diagnostics",
    aliases: ["Diagnostic"],
    relatedTerms: ["Assumption", "Residuals", "Robust"],
  },
  {
    term: "Correction",
    definition:
      "Adjustments made to statistical thresholds (like p-values) to account for multiple testing.",
    category: "Inference",
    aliases: ["Corrections"],
    relatedTerms: ["Multiple Comparisons", "False Positive", "Family-wise Error Rate (FWER)"],
  },
  {
    term: "Numeric",
    definition: "Data expressed as numbers, either continuous or discrete.",
    category: "Data Types",
    aliases: ["Numerical"],
    relatedTerms: ["Continuous Outcome", "Discrete"],
  },
  {
    term: "Indicator",
    definition:
      "A binary variable (0 or 1) used to indicate the presence or absence of some categorical condition.",
    category: "Data Types",
    aliases: ["Indicators", "Dummy variable", "Dummy variables"],
    relatedTerms: ["Category", "Dichotomous Variable"],
  },
  {
    term: "Resampling",
    definition:
      "Methods for drawing repeated samples from the data to construct empirical distributions.",
    category: "Machine Learning",
    aliases: ["Resample", "Resampled"],
    relatedTerms: ["Random Permutation", "Distribution"],
  },
  {
    term: "Distribution",
    definition:
      "A mathematical function that provides the probabilities of occurrence of different possible outcomes.",
    category: "Foundations",
    aliases: ["Distributions"],
    relatedTerms: ["Gaussian", "Uniform", "Density", "Parametric"],
  },
  {
    term: "Random Permutation",
    definition:
      "A technique of randomly shuffling the data to break any associations, often used in permutation tests.",
    category: "Inference",
    aliases: ["Random Permutations", "Permutations", "Permutation"],
    relatedTerms: ["Resampling", "Non-parametric"],
  },
  {
    term: "Null Distribution",
    definition:
      "The probability distribution of a test statistic under the assumption that the null hypothesis is true.",
    category: "Inference",
    aliases: ["Null Distributions"],
    relatedTerms: ["P-value", "Statistical Significance", "Random Permutation"],
  },
  {
    term: "Bayesian",
    definition:
      "A statistical paradigm that updates the probability for a hypothesis as more evidence or information becomes available.",
    category: "Inference",
    aliases: ["Bayesian inference"],
    relatedTerms: ["Posterior Probability", "Inference"],
  },
  {
    term: "Posterior Probability",
    definition:
      "The revised probability of an event occurring after taking into consideration new information.",
    category: "Inference",
    aliases: ["Posterior Probabilities", "Posterior"],
    relatedTerms: ["Bayesian", "P-value"],
  },
  {
    term: "Standardized",
    definition:
      "Data that has been rescaled to have a mean of zero and a standard deviation of one.",
    category: "Foundations",
    aliases: ["Standardize", "Standardization"],
    relatedTerms: ["Normalized", "Variance", "Mean"],
  },
  {
    term: "Category",
    definition: "A distinct group or class to which observations can be assigned.",
    category: "Data Types",
    aliases: ["Categories", "Categorical"],
    relatedTerms: ["Discrete", "Label", "Contingency Table"],
  },
  {
    term: "Count",
    definition:
      "Data consisting of non-negative integers representing the number of occurrences of an event.",
    category: "Data Types",
    aliases: ["Counts"],
    relatedTerms: ["Count Outcome", "Discrete"],
  },
  {
    term: "Independence",
    definition:
      "The condition where the occurrence of one event or observation does not affect the probability of another.",
    category: "Foundations",
    aliases: ["Independent"],
    relatedTerms: ["Association", "Correlated"],
  },
  {
    term: "Normalized",
    definition: "Data that has been scaled to a specific mathematical range, such as 0 to 1.",
    category: "Foundations",
    aliases: ["Normalize", "Normalization"],
    relatedTerms: ["Standardized"],
  },
  {
    term: "Discrete",
    definition: "Variables that can only take on specific, separate values, typically integers.",
    category: "Data Types",
    aliases: ["Discrete Variables"],
    relatedTerms: ["Numeric", "Category", "Count"],
  },
  {
    term: "Dichotomous Variable",
    definition: "A variable that can take exactly two distinct values (e.g., true/false, yes/no).",
    category: "Data Types",
    aliases: ["Dichotomous Variables", "Dichotomous"],
    relatedTerms: ["Binary Outcome", "Indicator"],
  },
  {
    term: "Interpretable",
    definition: "The degree to which a human can understand the cause of a model's decision.",
    category: "Machine Learning",
    aliases: ["Interpretability"],
    relatedTerms: ["Model", "Predictive"],
  },
  {
    term: "Inference",
    definition: "The process of drawing conclusions about a population from a sample of data.",
    category: "Inference",
    aliases: ["Inferences"],
    relatedTerms: ["P-value", "Confidence Interval", "Statistical Significance"],
  },
  {
    term: "Regularized",
    definition: "The application of penalties to a model to prevent overfitting.",
    category: "Machine Learning",
    aliases: ["Regularize"],
    relatedTerms: ["Regularization", "Model", "Overfitting"],
  },
  {
    term: "Predictive",
    definition:
      "Relating to methods or models that predict future outcomes based on historical data.",
    category: "Machine Learning",
    aliases: ["Prediction", "Predictions"],
    relatedTerms: ["Model", "Forecasting", "Classification", "Regression"],
  },
  {
    term: "Nonlinear",
    definition:
      "A relationship between variables that cannot be accurately represented by a straight line.",
    category: "Modeling",
    aliases: ["Non-linear"],
    relatedTerms: ["Interaction", "Model"],
  },
  {
    term: "Interaction",
    definition:
      "When the effect of one predictor variable on the outcome depends on the level of another predictor.",
    category: "Modeling",
    aliases: ["Interactions"],
    relatedTerms: ["Nonlinear", "Predictor"],
  },
  {
    term: "Noise",
    definition: "Unexplained or random variation in a data sample.",
    category: "Foundations",
    aliases: ["Noisy"],
    relatedTerms: ["Variance", "Robust", "Residuals"],
  },
  {
    term: "Partition",
    definition:
      "Dividing a dataset into distinct, non-overlapping subsets (e.g., training and testing sets).",
    category: "Machine Learning",
    aliases: ["Partitions"],
    relatedTerms: ["Training Set", "Validation Set", "Test Set"],
  },
  {
    term: "Probabilistic",
    definition:
      "Based on or incorporating probability and randomness, rather than deterministic rules.",
    category: "Foundations",
    aliases: ["Probability", "Probabilities"],
    relatedTerms: ["Distribution", "Model"],
  },
  {
    term: "Gaussian",
    definition: "Referring to the normal distribution, a symmetric bell-shaped curve.",
    category: "Foundations",
    aliases: ["Normal distribution", "Bell curve"],
    relatedTerms: ["Distribution", "Normality", "Parametric"],
  },
  {
    term: "Density",
    definition:
      "A function that describes the relative likelihood for an continuous random variable to take on a given value.",
    category: "Foundations",
    aliases: ["Densities", "Probability density"],
    relatedTerms: ["Distribution", "Gaussian"],
  },
  {
    term: "Dimensionality",
    definition: "The number of attributes, features, or predictors in a dataset.",
    category: "Unsupervised",
    aliases: ["Dimensions", "Dimension"],
    relatedTerms: ["Dimensionality Reduction", "Factor", "Latent"],
  },
  {
    term: "Orthogonal",
    definition:
      "Statistically independent or uncorrelated; commonly used in principal component analysis.",
    category: "Foundations",
    aliases: ["Orthogonality"],
    relatedTerms: ["Dimensionality Reduction", "Independence"],
  },
  {
    term: "Factor",
    definition: "A categorical independent variable, or an unobserved variable in Factor Analysis.",
    category: "Data Types",
    aliases: ["Factors"],
    relatedTerms: ["Latent", "Dimensionality", "Category"],
  },
  {
    term: "Latent",
    definition:
      "Variables that are not directly observed but are rather inferred from other variables.",
    category: "Modeling",
    aliases: ["Latent variables"],
    relatedTerms: ["Factor", "Manifold", "Model"],
  },
  {
    term: "Manifold",
    definition:
      "A topological space that locally resembles Euclidean space; often relevant in complex dimensionality reduction.",
    category: "Unsupervised",
    aliases: ["Manifolds"],
    relatedTerms: ["Latent", "Dimensionality Reduction"],
  },
  {
    term: "Approximation",
    definition: "An inexact but useful representation of a value, model, or distribution.",
    category: "Foundations",
    aliases: ["Approximations", "Approximate"],
    relatedTerms: ["Model", "Inference"],
  },
  {
    term: "Uniform",
    definition:
      "A distribution where all outcomes or intervals of the same length are equally likely.",
    category: "Foundations",
    aliases: ["Uniform distribution"],
    relatedTerms: ["Distribution", "Gaussian"],
  },
  {
    term: "Correlated",
    definition: "Variables that exhibit a statistical association or relationship with each other.",
    category: "Correlation",
    aliases: [],
    relatedTerms: ["Correlation", "Association", "Independence"],
  },
  {
    term: "Jointly",
    definition: "Considering multiple variables or distributions together simultaneously.",
    category: "Foundations",
    aliases: ["Joint"],
    relatedTerms: ["Distribution", "Association"],
  },
  {
    term: "Causality",
    definition:
      "The relationship between cause and effect; changes in one variable directly produce changes in another.",
    category: "Foundations",
    aliases: ["Causal"],
    relatedTerms: ["Association", "Treatment", "Effect"],
  },
  {
    term: "Series",
    definition: "A sequence of data points, ordered typically by time (e.g., Time Series).",
    category: "Time Series",
    aliases: ["Time Series"],
    relatedTerms: ["Temporal", "Forecasting"],
  },
  {
    term: "Non-zero",
    definition:
      "A value that is distinct from zero, often corresponding to an effect or coefficient being significant.",
    category: "Foundations",
    aliases: ["Non zero"],
    relatedTerms: ["Statistical Significance", "Effect"],
  },
  {
    term: "Temporal",
    definition: "Relating to time or sequence.",
    category: "Time Series",
    aliases: [],
    relatedTerms: ["Series", "Forecasting"],
  },
  {
    term: "Spatial",
    definition: "Relating to space or geographic location.",
    category: "Foundations",
    aliases: [],
    relatedTerms: ["Temporal", "Clustering"],
  },
  {
    term: "Risk",
    definition: "The probability of an outcome, typically an adverse event, occurring.",
    category: "Survival",
    aliases: ["Risks"],
    relatedTerms: ["Hazard", "Time-to-Event Outcome"],
  },
  {
    term: "Dose",
    definition: "The amount or level of a treatment or exposure given to subjects.",
    category: "Design",
    aliases: ["Doses"],
    relatedTerms: ["Treatment", "Effect", "Predictor"],
  },
  {
    term: "Effect",
    definition:
      "The change in an outcome variable that is associated with a change in a predictor or treatment.",
    category: "Inference",
    aliases: ["Effects"],
    relatedTerms: ["Effect Size", "Treatment", "Causality"],
  },
  {
    term: "False Positive",
    definition:
      "A test result which incorrectly indicates that a particular condition or attribute is present.",
    category: "Inference",
    aliases: ["False Positives", "Type I Error"],
    relatedTerms: ["Type I Error", "False Negative", "True Positive"],
  },
  {
    term: "False Negative",
    definition:
      "A test result which incorrectly indicates that a particular condition or attribute is absent.",
    category: "Inference",
    aliases: ["False Negatives", "Type II error"],
    relatedTerms: ["Type II Error", "False Positive", "True Negative"],
  },
  {
    term: "True Positive",
    definition: "A test result that correctly indicates the presence of a condition or effect.",
    category: "Inference",
    aliases: ["True Positives"],
    relatedTerms: ["False Positive", "True Negative"],
  },
  {
    term: "True Negative",
    definition: "A test result that correctly indicates the absence of a condition or effect.",
    category: "Inference",
    aliases: ["True Negatives"],
    relatedTerms: ["False Negative", "True Positive"],
  },
  {
    term: "P-value",
    definition:
      "The probability of obtaining test results at least as extreme as the observed results, assuming the null hypothesis is correct.",
    category: "Inference",
    aliases: ["p-values", "p-value", "P-values"],
    relatedTerms: ["Statistical Significance", "Null Distribution", "Confidence Interval"],
  },
  {
    term: "Spread",
    definition: "The extent to which a set of data values vary or are dispersed from the center.",
    category: "Foundations",
    aliases: ["Dispersion"],
    relatedTerms: ["Variance", "Standard Deviation", "Variability"],
  },
  {
    term: "Variability",
    definition: "The degree to which data points diverge from the average, or from each other.",
    category: "Foundations",
    aliases: ["Variation"],
    relatedTerms: ["Spread", "Variance", "Noise"],
  },
  {
    term: "Robust",
    definition:
      "Statistical methods that are not unduly affected by outliers or violations of assumptions.",
    category: "Foundations",
    aliases: ["Robustness"],
    relatedTerms: ["Outlier", "Assumption", "Non-parametric"],
  },
  {
    term: "Deviation",
    definition: "The difference between an observed value and a reference value, such as a mean.",
    category: "Foundations",
    aliases: ["Deviations"],
    relatedTerms: ["Residuals", "Variance", "Spread"],
  },
  {
    term: "Median",
    definition:
      "The middle value in a sorted sequence of numbers; a robust measure of central tendency.",
    category: "Foundations",
    aliases: ["Medians"],
    relatedTerms: ["Mean", "Robust", "Spread"],
  },
  {
    term: "Step-down",
    definition:
      "A type of stepwise multiple comparisons procedure that sequences tests from most to least significant.",
    category: "Inference",
    aliases: ["Step down"],
    relatedTerms: ["Multiple Comparisons", "Family-wise Error Rate (FWER)"],
  },
  {
    term: "Error Rate",
    definition:
      "The frequency or probability of making incorrect statistical decisions (like false positives).",
    category: "Inference",
    aliases: ["Error Rates"],
    relatedTerms: ["False Positive", "False Negative"],
  },
  {
    term: "Pairwise",
    definition: "Referring to combinations or comparisons of items two at a time.",
    category: "Inference",
    aliases: ["Pairwise comparisons"],
    relatedTerms: ["Multiple Comparisons", "Group Comparison"],
  },
  {
    term: "Exact Test",
    definition:
      "A hypothesis test that computes p-values from the exact sampling distribution (not an asymptotic/large-sample approximation). Often used when sample sizes are small or expected counts are low.",
    category: "Inference",
    aliases: ["Exact inference", "Exact significance test", "Exact Tests"],
    relatedTerms: [],
  },
  {
    term: "Longitudinal",
    definition:
      "A study design where the same subjects are measured repeatedly over time, allowing analysis of within-subject change and time trends (often with correlated observations).",
    category: "Study Design",
    aliases: [],
    relatedTerms: ["Repeated Measures", "Clustered Data", "Mixed Models", "Time Series"],
  },
  {
    term: "Bernoulli",
    definition:
      "A distribution for a single binary trial with outcomes 0/1 (failure/success) and success probability p. It is the building block of the binomial model and many binary-outcome methods.",
    category: "Probability",
    aliases: ["Bernoulli trial", "Binary trial"],
    relatedTerms: ["Proportion"],
  },
];
