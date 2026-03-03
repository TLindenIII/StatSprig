import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface SchemaV2Fields {
  outcomeScale: string;
  predictorStructure: string;
  design: string;
  level: string;
  alternativeLinks: string[];
}

const testEnrichment: Record<string, SchemaV2Fields> = {
  // Group Comparison - Parametric
  "t-test-independent": {
    outcomeScale: "continuous",
    predictorStructure: "single categorical",
    design: "independent groups",
    level: "basic",
    alternativeLinks: ["mann-whitney", "welch-t-test", "bayesian-t-test"]
  },
  "paired-t-test": {
    outcomeScale: "continuous",
    predictorStructure: "single categorical",
    design: "paired/repeated measures",
    level: "basic",
    alternativeLinks: ["wilcoxon-signed-rank"]
  },
  "one-way-anova": {
    outcomeScale: "continuous",
    predictorStructure: "single categorical",
    design: "independent groups",
    level: "basic",
    alternativeLinks: ["kruskal-wallis", "welch-anova", "bayesian-anova"]
  },
  "two-way-anova": {
    outcomeScale: "continuous",
    predictorStructure: "multiple categorical",
    design: "factorial",
    level: "intermediate",
    alternativeLinks: ["linear-mixed-model", "manova"]
  },
  "repeated-measures-anova": {
    outcomeScale: "continuous",
    predictorStructure: "single categorical",
    design: "paired/repeated measures",
    level: "intermediate",
    alternativeLinks: ["friedman-test", "linear-mixed-model"]
  },
  "welch-t-test": {
    outcomeScale: "continuous",
    predictorStructure: "single categorical",
    design: "independent groups",
    level: "basic",
    alternativeLinks: ["t-test-independent", "mann-whitney"]
  },
  "welch-anova": {
    outcomeScale: "continuous",
    predictorStructure: "single categorical",
    design: "independent groups",
    level: "intermediate",
    alternativeLinks: ["one-way-anova", "kruskal-wallis"]
  },
  "ancova": {
    outcomeScale: "continuous",
    predictorStructure: "mixed",
    design: "independent groups",
    level: "intermediate",
    alternativeLinks: ["multiple-regression", "linear-mixed-model"]
  },
  "manova": {
    outcomeScale: "multivariate",
    predictorStructure: "single categorical",
    design: "independent groups",
    level: "advanced",
    alternativeLinks: ["two-way-anova", "discriminant-analysis"]
  },
  
  // Group Comparison - Non-parametric
  "mann-whitney": {
    outcomeScale: "ordinal",
    predictorStructure: "single categorical",
    design: "independent groups",
    level: "basic",
    alternativeLinks: ["t-test-independent", "permutation-test"]
  },
  "wilcoxon-signed-rank": {
    outcomeScale: "ordinal",
    predictorStructure: "single categorical",
    design: "paired/repeated measures",
    level: "basic",
    alternativeLinks: ["paired-t-test"]
  },
  "kruskal-wallis": {
    outcomeScale: "ordinal",
    predictorStructure: "single categorical",
    design: "independent groups",
    level: "basic",
    alternativeLinks: ["one-way-anova", "dunn-test"]
  },
  "friedman-test": {
    outcomeScale: "ordinal",
    predictorStructure: "single categorical",
    design: "paired/repeated measures",
    level: "intermediate",
    alternativeLinks: ["repeated-measures-anova"]
  },
  
  // Correlation
  "pearson-correlation": {
    outcomeScale: "continuous",
    predictorStructure: "single continuous",
    design: "cross-sectional",
    level: "basic",
    alternativeLinks: ["spearman-correlation", "kendall-tau"]
  },
  "spearman-correlation": {
    outcomeScale: "ordinal",
    predictorStructure: "single continuous",
    design: "cross-sectional",
    level: "basic",
    alternativeLinks: ["pearson-correlation", "kendall-tau"]
  },
  "partial-correlation": {
    outcomeScale: "continuous",
    predictorStructure: "multiple continuous",
    design: "cross-sectional",
    level: "intermediate",
    alternativeLinks: ["multiple-regression"]
  },
  "kendall-tau": {
    outcomeScale: "ordinal",
    predictorStructure: "single continuous",
    design: "cross-sectional",
    level: "basic",
    alternativeLinks: ["spearman-correlation", "pearson-correlation"]
  },
  "point-biserial": {
    outcomeScale: "continuous",
    predictorStructure: "single categorical",
    design: "cross-sectional",
    level: "basic",
    alternativeLinks: ["pearson-correlation", "t-test-independent"]
  },
  "intraclass-correlation": {
    outcomeScale: "continuous",
    predictorStructure: "none",
    design: "paired/repeated measures",
    level: "intermediate",
    alternativeLinks: ["cohens-kappa", "linear-mixed-model"]
  },
  
  // Regression
  "linear-regression": {
    outcomeScale: "continuous",
    predictorStructure: "single continuous",
    design: "cross-sectional",
    level: "basic",
    alternativeLinks: ["multiple-regression", "robust-regression", "bayesian-regression"]
  },
  "multiple-regression": {
    outcomeScale: "continuous",
    predictorStructure: "multiple mixed",
    design: "cross-sectional",
    level: "intermediate",
    alternativeLinks: ["linear-regression", "lasso-ridge", "elastic-net"]
  },
  "logistic-regression": {
    outcomeScale: "binary",
    predictorStructure: "multiple mixed",
    design: "cross-sectional",
    level: "intermediate",
    alternativeLinks: ["probit-regression", "random-forest", "svm"]
  },
  "poisson-regression": {
    outcomeScale: "count",
    predictorStructure: "multiple mixed",
    design: "cross-sectional",
    level: "intermediate",
    alternativeLinks: ["negative-binomial", "zero-inflated-poisson"]
  },
  "ordinal-regression": {
    outcomeScale: "ordinal",
    predictorStructure: "multiple mixed",
    design: "cross-sectional",
    level: "intermediate",
    alternativeLinks: ["logistic-regression", "multinomial-logistic"]
  },
  "negative-binomial": {
    outcomeScale: "count",
    predictorStructure: "multiple mixed",
    design: "cross-sectional",
    level: "intermediate",
    alternativeLinks: ["poisson-regression", "zero-inflated-poisson"]
  },
  "zero-inflated-poisson": {
    outcomeScale: "count",
    predictorStructure: "multiple mixed",
    design: "cross-sectional",
    level: "advanced",
    alternativeLinks: ["poisson-regression", "negative-binomial"]
  },
  "quantile-regression": {
    outcomeScale: "continuous",
    predictorStructure: "multiple mixed",
    design: "cross-sectional",
    level: "advanced",
    alternativeLinks: ["linear-regression", "robust-regression"]
  },
  "robust-regression": {
    outcomeScale: "continuous",
    predictorStructure: "multiple mixed",
    design: "cross-sectional",
    level: "intermediate",
    alternativeLinks: ["linear-regression", "quantile-regression"]
  },
  "probit-regression": {
    outcomeScale: "binary",
    predictorStructure: "multiple mixed",
    design: "cross-sectional",
    level: "intermediate",
    alternativeLinks: ["logistic-regression"]
  },
  
  // Categorical Analysis
  "chi-square": {
    outcomeScale: "nominal",
    predictorStructure: "single categorical",
    design: "cross-sectional",
    level: "basic",
    alternativeLinks: ["fisher-exact", "cramers-v"]
  },
  "fisher-exact": {
    outcomeScale: "nominal",
    predictorStructure: "single categorical",
    design: "cross-sectional",
    level: "basic",
    alternativeLinks: ["chi-square"]
  },
  "mcnemar-test": {
    outcomeScale: "binary",
    predictorStructure: "single categorical",
    design: "paired/repeated measures",
    level: "intermediate",
    alternativeLinks: ["cochran-q"]
  },
  "cochran-q": {
    outcomeScale: "binary",
    predictorStructure: "single categorical",
    design: "paired/repeated measures",
    level: "intermediate",
    alternativeLinks: ["mcnemar-test", "friedman-test"]
  },
  "cramers-v": {
    outcomeScale: "nominal",
    predictorStructure: "single categorical",
    design: "cross-sectional",
    level: "basic",
    alternativeLinks: ["chi-square", "cohens-kappa"]
  },
  "cohens-kappa": {
    outcomeScale: "nominal",
    predictorStructure: "none",
    design: "cross-sectional",
    level: "basic",
    alternativeLinks: ["fleiss-kappa", "intraclass-correlation"]
  },
  "fleiss-kappa": {
    outcomeScale: "nominal",
    predictorStructure: "none",
    design: "cross-sectional",
    level: "intermediate",
    alternativeLinks: ["cohens-kappa"]
  },
  
  // Mixed Models
  "linear-mixed-model": {
    outcomeScale: "continuous",
    predictorStructure: "multiple mixed",
    design: "longitudinal",
    level: "advanced",
    alternativeLinks: ["glmm", "repeated-measures-anova"]
  },
  "glmm": {
    outcomeScale: "binary",
    predictorStructure: "multiple mixed",
    design: "longitudinal",
    level: "advanced",
    alternativeLinks: ["linear-mixed-model", "gee"]
  },
  
  // Time Series
  "arima": {
    outcomeScale: "continuous",
    predictorStructure: "none",
    design: "time-series",
    level: "intermediate",
    alternativeLinks: ["exponential-smoothing", "prophet", "var"]
  },
  "exponential-smoothing": {
    outcomeScale: "continuous",
    predictorStructure: "none",
    design: "time-series",
    level: "intermediate",
    alternativeLinks: ["arima", "prophet"]
  },
  "prophet": {
    outcomeScale: "continuous",
    predictorStructure: "none",
    design: "time-series",
    level: "intermediate",
    alternativeLinks: ["arima", "exponential-smoothing"]
  },
  "adf-test": {
    outcomeScale: "continuous",
    predictorStructure: "none",
    design: "time-series",
    level: "intermediate",
    alternativeLinks: ["ljung-box"]
  },
  "granger-causality": {
    outcomeScale: "continuous",
    predictorStructure: "multiple continuous",
    design: "time-series",
    level: "advanced",
    alternativeLinks: ["var"]
  },
  "ljung-box": {
    outcomeScale: "continuous",
    predictorStructure: "none",
    design: "time-series",
    level: "intermediate",
    alternativeLinks: ["adf-test", "durbin-watson"]
  },
  "var": {
    outcomeScale: "multivariate",
    predictorStructure: "multiple continuous",
    design: "time-series",
    level: "advanced",
    alternativeLinks: ["arima", "granger-causality"]
  },
  
  // Survival Analysis
  "kaplan-meier": {
    outcomeScale: "time-to-event",
    predictorStructure: "none",
    design: "longitudinal",
    level: "intermediate",
    alternativeLinks: ["log-rank-test", "cox-regression"]
  },
  "log-rank-test": {
    outcomeScale: "time-to-event",
    predictorStructure: "single categorical",
    design: "longitudinal",
    level: "intermediate",
    alternativeLinks: ["kaplan-meier", "cox-regression"]
  },
  "cox-regression": {
    outcomeScale: "time-to-event",
    predictorStructure: "multiple mixed",
    design: "longitudinal",
    level: "advanced",
    alternativeLinks: ["kaplan-meier", "accelerated-failure-time", "random-survival-forest"]
  },
  "accelerated-failure-time": {
    outcomeScale: "time-to-event",
    predictorStructure: "multiple mixed",
    design: "longitudinal",
    level: "advanced",
    alternativeLinks: ["cox-regression"]
  },
  "competing-risks": {
    outcomeScale: "time-to-event",
    predictorStructure: "multiple mixed",
    design: "longitudinal",
    level: "advanced",
    alternativeLinks: ["cox-regression", "kaplan-meier"]
  },
  "random-survival-forest": {
    outcomeScale: "time-to-event",
    predictorStructure: "multiple mixed",
    design: "longitudinal",
    level: "advanced",
    alternativeLinks: ["cox-regression", "random-forest"]
  },
  
  // Clustering
  "kmeans": {
    outcomeScale: "multivariate",
    predictorStructure: "none",
    design: "cross-sectional",
    level: "basic",
    alternativeLinks: ["hierarchical-clustering", "dbscan", "gaussian-mixture"]
  },
  "hierarchical-clustering": {
    outcomeScale: "multivariate",
    predictorStructure: "none",
    design: "cross-sectional",
    level: "intermediate",
    alternativeLinks: ["kmeans", "dbscan"]
  },
  "dbscan": {
    outcomeScale: "multivariate",
    predictorStructure: "none",
    design: "cross-sectional",
    level: "intermediate",
    alternativeLinks: ["kmeans", "gaussian-mixture"]
  },
  "gaussian-mixture": {
    outcomeScale: "multivariate",
    predictorStructure: "none",
    design: "cross-sectional",
    level: "intermediate",
    alternativeLinks: ["kmeans", "dbscan"]
  },
  
  // Dimension Reduction
  "pca": {
    outcomeScale: "multivariate",
    predictorStructure: "none",
    design: "cross-sectional",
    level: "intermediate",
    alternativeLinks: ["factor-analysis", "tsne", "umap"]
  },
  "factor-analysis": {
    outcomeScale: "multivariate",
    predictorStructure: "none",
    design: "cross-sectional",
    level: "intermediate",
    alternativeLinks: ["pca"]
  },
  "tsne": {
    outcomeScale: "multivariate",
    predictorStructure: "none",
    design: "cross-sectional",
    level: "intermediate",
    alternativeLinks: ["umap", "pca"]
  },
  "umap": {
    outcomeScale: "multivariate",
    predictorStructure: "none",
    design: "cross-sectional",
    level: "intermediate",
    alternativeLinks: ["tsne", "pca"]
  },
  
  // Machine Learning
  "random-forest": {
    outcomeScale: "continuous",
    predictorStructure: "multiple mixed",
    design: "cross-sectional",
    level: "intermediate",
    alternativeLinks: ["gradient-boosting", "xgboost", "decision-tree"]
  },
  "gradient-boosting": {
    outcomeScale: "continuous",
    predictorStructure: "multiple mixed",
    design: "cross-sectional",
    level: "intermediate",
    alternativeLinks: ["random-forest", "xgboost", "lightgbm"]
  },
  "lasso-ridge": {
    outcomeScale: "continuous",
    predictorStructure: "multiple continuous",
    design: "cross-sectional",
    level: "intermediate",
    alternativeLinks: ["elastic-net", "multiple-regression"]
  },
  "svm": {
    outcomeScale: "binary",
    predictorStructure: "multiple mixed",
    design: "cross-sectional",
    level: "intermediate",
    alternativeLinks: ["logistic-regression", "random-forest"]
  },
  "xgboost": {
    outcomeScale: "continuous",
    predictorStructure: "multiple mixed",
    design: "cross-sectional",
    level: "intermediate",
    alternativeLinks: ["gradient-boosting", "lightgbm", "catboost"]
  },
  "lightgbm": {
    outcomeScale: "continuous",
    predictorStructure: "multiple mixed",
    design: "cross-sectional",
    level: "intermediate",
    alternativeLinks: ["xgboost", "catboost"]
  },
  "catboost": {
    outcomeScale: "continuous",
    predictorStructure: "multiple mixed",
    design: "cross-sectional",
    level: "intermediate",
    alternativeLinks: ["xgboost", "lightgbm"]
  },
  "knn": {
    outcomeScale: "continuous",
    predictorStructure: "multiple mixed",
    design: "cross-sectional",
    level: "basic",
    alternativeLinks: ["random-forest", "svm"]
  },
  "naive-bayes": {
    outcomeScale: "binary",
    predictorStructure: "multiple mixed",
    design: "cross-sectional",
    level: "basic",
    alternativeLinks: ["logistic-regression", "random-forest"]
  },
  "decision-tree": {
    outcomeScale: "continuous",
    predictorStructure: "multiple mixed",
    design: "cross-sectional",
    level: "basic",
    alternativeLinks: ["random-forest", "gradient-boosting"]
  },
  "elastic-net": {
    outcomeScale: "continuous",
    predictorStructure: "multiple continuous",
    design: "cross-sectional",
    level: "intermediate",
    alternativeLinks: ["lasso-ridge", "multiple-regression"]
  },
  "neural-network-mlp": {
    outcomeScale: "continuous",
    predictorStructure: "multiple mixed",
    design: "cross-sectional",
    level: "advanced",
    alternativeLinks: ["random-forest", "gradient-boosting"]
  },
  
  // Resampling
  "bootstrap": {
    outcomeScale: "continuous",
    predictorStructure: "none",
    design: "cross-sectional",
    level: "intermediate",
    alternativeLinks: ["permutation-test"]
  },
  "permutation-test": {
    outcomeScale: "continuous",
    predictorStructure: "single categorical",
    design: "independent groups",
    level: "intermediate",
    alternativeLinks: ["bootstrap", "mann-whitney"]
  },
  
  // Assumption Testing
  "levene-test": {
    outcomeScale: "continuous",
    predictorStructure: "single categorical",
    design: "independent groups",
    level: "basic",
    alternativeLinks: ["bartlett-test", "brown-forsythe", "fligner-killeen"]
  },
  "bartlett-test": {
    outcomeScale: "continuous",
    predictorStructure: "single categorical",
    design: "independent groups",
    level: "basic",
    alternativeLinks: ["levene-test", "brown-forsythe"]
  },
  "brown-forsythe": {
    outcomeScale: "continuous",
    predictorStructure: "single categorical",
    design: "independent groups",
    level: "basic",
    alternativeLinks: ["levene-test", "bartlett-test"]
  },
  "fligner-killeen": {
    outcomeScale: "continuous",
    predictorStructure: "single categorical",
    design: "independent groups",
    level: "intermediate",
    alternativeLinks: ["levene-test"]
  },
  "hartley-fmax": {
    outcomeScale: "continuous",
    predictorStructure: "single categorical",
    design: "independent groups",
    level: "basic",
    alternativeLinks: ["levene-test", "bartlett-test"]
  },
  "shapiro-wilk": {
    outcomeScale: "continuous",
    predictorStructure: "none",
    design: "cross-sectional",
    level: "basic",
    alternativeLinks: ["kolmogorov-smirnov", "anderson-darling", "dagostino-pearson"]
  },
  "kolmogorov-smirnov": {
    outcomeScale: "continuous",
    predictorStructure: "none",
    design: "cross-sectional",
    level: "basic",
    alternativeLinks: ["shapiro-wilk", "anderson-darling"]
  },
  "anderson-darling": {
    outcomeScale: "continuous",
    predictorStructure: "none",
    design: "cross-sectional",
    level: "intermediate",
    alternativeLinks: ["shapiro-wilk", "kolmogorov-smirnov"]
  },
  "dagostino-pearson": {
    outcomeScale: "continuous",
    predictorStructure: "none",
    design: "cross-sectional",
    level: "intermediate",
    alternativeLinks: ["shapiro-wilk"]
  },
  "durbin-watson": {
    outcomeScale: "continuous",
    predictorStructure: "none",
    design: "time-series",
    level: "intermediate",
    alternativeLinks: ["ljung-box", "breusch-pagan"]
  },
  "breusch-pagan": {
    outcomeScale: "continuous",
    predictorStructure: "multiple mixed",
    design: "cross-sectional",
    level: "intermediate",
    alternativeLinks: ["durbin-watson"]
  },
  "vif": {
    outcomeScale: "continuous",
    predictorStructure: "multiple mixed",
    design: "cross-sectional",
    level: "basic",
    alternativeLinks: []
  },
  
  // Post-hoc Tests
  "tukey-hsd": {
    outcomeScale: "continuous",
    predictorStructure: "single categorical",
    design: "independent groups",
    level: "basic",
    alternativeLinks: ["bonferroni", "games-howell", "scheffe-test"]
  },
  "bonferroni": {
    outcomeScale: "continuous",
    predictorStructure: "single categorical",
    design: "independent groups",
    level: "basic",
    alternativeLinks: ["holm-bonferroni", "tukey-hsd", "benjamini-hochberg"]
  },
  "holm-bonferroni": {
    outcomeScale: "continuous",
    predictorStructure: "single categorical",
    design: "independent groups",
    level: "basic",
    alternativeLinks: ["bonferroni", "benjamini-hochberg"]
  },
  "benjamini-hochberg": {
    outcomeScale: "continuous",
    predictorStructure: "single categorical",
    design: "independent groups",
    level: "intermediate",
    alternativeLinks: ["bonferroni", "holm-bonferroni"]
  },
  "dunnett-test": {
    outcomeScale: "continuous",
    predictorStructure: "single categorical",
    design: "independent groups",
    level: "intermediate",
    alternativeLinks: ["tukey-hsd"]
  },
  "games-howell": {
    outcomeScale: "continuous",
    predictorStructure: "single categorical",
    design: "independent groups",
    level: "intermediate",
    alternativeLinks: ["tukey-hsd", "scheffe-test"]
  },
  "scheffe-test": {
    outcomeScale: "continuous",
    predictorStructure: "single categorical",
    design: "independent groups",
    level: "intermediate",
    alternativeLinks: ["tukey-hsd", "games-howell"]
  },
  "dunn-test": {
    outcomeScale: "ordinal",
    predictorStructure: "single categorical",
    design: "independent groups",
    level: "intermediate",
    alternativeLinks: ["kruskal-wallis"]
  },
  
  // Bayesian Methods
  "bayesian-t-test": {
    outcomeScale: "continuous",
    predictorStructure: "single categorical",
    design: "independent groups",
    level: "intermediate",
    alternativeLinks: ["t-test-independent", "bayesian-anova"]
  },
  "bayesian-regression": {
    outcomeScale: "continuous",
    predictorStructure: "multiple mixed",
    design: "cross-sectional",
    level: "advanced",
    alternativeLinks: ["linear-regression", "multiple-regression"]
  },
  "bayesian-anova": {
    outcomeScale: "continuous",
    predictorStructure: "single categorical",
    design: "independent groups",
    level: "intermediate",
    alternativeLinks: ["one-way-anova", "bayesian-t-test"]
  },
  
  // Effect Size
  "cohens-d": {
    outcomeScale: "continuous",
    predictorStructure: "single categorical",
    design: "independent groups",
    level: "basic",
    alternativeLinks: ["hedges-g", "eta-squared"]
  },
  "hedges-g": {
    outcomeScale: "continuous",
    predictorStructure: "single categorical",
    design: "independent groups",
    level: "basic",
    alternativeLinks: ["cohens-d"]
  },
  "eta-squared": {
    outcomeScale: "continuous",
    predictorStructure: "single categorical",
    design: "independent groups",
    level: "basic",
    alternativeLinks: ["cohens-d", "odds-ratio"]
  },
  "odds-ratio": {
    outcomeScale: "binary",
    predictorStructure: "single categorical",
    design: "cross-sectional",
    level: "basic",
    alternativeLinks: ["eta-squared"]
  },
  
  // Study Planning
  "power-analysis": {
    outcomeScale: "continuous",
    predictorStructure: "none",
    design: "cross-sectional",
    level: "intermediate",
    alternativeLinks: []
  }
};

const statsDataPath = path.join(__dirname, '../client/src/lib/statsData.ts');
let content = fs.readFileSync(statsDataPath, 'utf8');

const testPattern = /\{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)",/g;
let match;
const foundIds: string[] = [];

while ((match = testPattern.exec(content)) !== null) {
  foundIds.push(match[1]);
}

console.log(`Found ${foundIds.length} tests`);
console.log(`Enrichment data for ${Object.keys(testEnrichment).length} tests`);

const missingEnrichment = foundIds.filter(id => !testEnrichment[id]);
if (missingEnrichment.length > 0) {
  console.log(`Missing enrichment for: ${missingEnrichment.join(', ')}`);
}

for (const testId of Object.keys(testEnrichment)) {
  const enrichment = testEnrichment[testId];
  
  const pattern = new RegExp(
    `(\\{\\s*id:\\s*"${testId}",\\s*name:\\s*"[^"]+",\\s*description:\\s*"[^"]+",\\s*assumptions:\\s*\\[[^\\]]*\\],\\s*whenToUse:\\s*\\[[^\\]]*\\],\\s*alternatives:\\s*\\[[^\\]]*\\],\\s*methodFamily:\\s*"[^"]+",\\s*category:\\s*"[^"]+",\\s*categoryId:\\s*"[^"]+",?)\\s*(\\})`,
    'g'
  );
  
  const replacement = `$1
    outcomeScale: "${enrichment.outcomeScale}",
    predictorStructure: "${enrichment.predictorStructure}",
    design: "${enrichment.design}",
    level: "${enrichment.level}",
    alternativeLinks: [${enrichment.alternativeLinks.map(l => `"${l}"`).join(', ')}],
  $2`;
  
  content = content.replace(pattern, replacement);
}

fs.writeFileSync(statsDataPath, content);
console.log('Schema v2 fields populated successfully!');
