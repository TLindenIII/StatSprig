
export const pythonSnippets: Record<string, string> = {
  "one-sample-t-test": `
import numpy as np
from scipy import stats # pip install scipy

x = np.array([5.2, 4.9, 5.1, 5.0, 4.8, 5.3])
mu0 = 5.0
t_stat, p_val = stats.ttest_1samp(x, popmean=mu0)
`.trim(),

  "one-proportion-z-test": `
import statsmodels.api as sm # pip install statsmodels

successes, n = 56, 100
p0 = 0.50
z_stat, p_val = sm.stats.proportions_ztest(count=successes, nobs=n, value=p0)
`.trim(),

  "binomial-test": `
from scipy import stats # pip install scipy

successes, n = 8, 12
p0 = 0.50
res = stats.binomtest(successes, n, p=p0, alternative="two-sided")
res.statistic, res.pvalue
`.trim(),

  "t-test-independent": `
import numpy as np
from scipy import stats # pip install scipy

a = np.array([10, 11, 9, 10, 12])
b = np.array([8, 9, 7, 10, 9])
t_stat, p_val = stats.ttest_ind(a, b, equal_var=True)
`.trim(),

  "paired-t-test": `
import numpy as np
from scipy import stats # pip install scipy

pre  = np.array([100, 98, 102, 101, 99])
post = np.array([103, 100, 104, 103, 101])
t_stat, p_val = stats.ttest_rel(post, pre)
`.trim(),

  "one-way-anova": `
import numpy as np
from scipy import stats # pip install scipy

g1 = np.array([5, 6, 5, 7])
g2 = np.array([8, 9, 7, 10])
g3 = np.array([6, 5, 7, 6])
f_stat, p_val = stats.f_oneway(g1, g2, g3)
`.trim(),

  "two-way-anova": `
import pandas as pd
import statsmodels.formula.api as smf
import statsmodels.api as sm # pip install statsmodels

df = pd.DataFrame({
    "y": [10,12,11,  9,8,10,  13,14,12,  11,10,12],
    "A": ["a1","a1","a1","a1","a1","a1","a2","a2","a2","a2","a2","a2"],
    "B": ["b1","b1","b2","b2","b3","b3","b1","b1","b2","b2","b3","b3"]
})
model = smf.ols("y ~ C(A) * C(B)", data=df).fit()
sm.stats.anova_lm(model, typ=2)
`.trim(),

  "repeated-measures-anova": `
import numpy as np
import pandas as pd
import pingouin as pg # pip install pingouin


df = pd.DataFrame({
    "subject": np.repeat(np.arange(1, 9), 3),
    "time":    np.tile(["t1","t2","t3"], 8),
    "y":       [5,6,7,  4,5,6,  6,7,7,  5,6,6,  4,5,5,  6,7,8,  5,5,6,  4,4,5]
})
pg.rm_anova(dv="y", within="time", subject="subject", data=df, detailed=True)
`.trim(),

  "two-proportion-z-test": `
import numpy as np
import statsmodels.api as sm # pip install statsmodels

count = np.array([45, 30])
nobs  = np.array([100, 90])
z_stat, p_val = sm.stats.proportions_ztest(count=count, nobs=nobs, value=0)
`.trim(),

  "mann-whitney": `
import numpy as np
from scipy import stats # pip install scipy

a = np.array([1,2,3,4,5])
b = np.array([3,4,5,6,7])
u_stat, p_val = stats.mannwhitneyu(a, b, alternative="two-sided")
`.trim(),

  "wilcoxon-signed-rank": `
import numpy as np
from scipy import stats # pip install scipy

pre  = np.array([10, 12, 11, 9, 10])
post = np.array([11, 12, 12, 10, 11])
w_stat, p_val = stats.wilcoxon(post, pre, alternative="two-sided")
`.trim(),

  "kruskal-wallis": `
import numpy as np
from scipy import stats # pip install scipy

g1 = np.array([1,2,2,3])
g2 = np.array([4,5,4,6])
g3 = np.array([2,3,3,2])
h_stat, p_val = stats.kruskal(g1, g2, g3)
`.trim(),

  "friedman-test": `
import numpy as np
from scipy import stats # pip install scipy

cond1 = np.array([10, 12, 11, 9])
cond2 = np.array([11, 13, 12, 10])
cond3 = np.array([12, 14, 13, 11])
stat, p_val = stats.friedmanchisquare(cond1, cond2, cond3)
`.trim(),

  "pearson-correlation": `
import numpy as np
from scipy import stats # pip install scipy

x = np.array([1,2,3,4,5])
y = np.array([2,1,4,3,5])
r, p_val = stats.pearsonr(x, y)
`.trim(),

  "spearman-correlation": `
import numpy as np
from scipy import stats # pip install scipy

x = np.array([1,2,3,4,5])
y = np.array([2,1,4,3,5])
rho, p_val = stats.spearmanr(x, y)
`.trim(),

  "partial-correlation": `
import pandas as pd
import pingouin as pg  # pip install pingouin

df = pd.DataFrame({
    "x": [1,2,3,4,5,6],
    "y": [2,1,4,3,6,5],
    "z": [10,11,9,12,10,11]
})
pg.partial_corr(data=df, x="x", y="y", covar="z", method="pearson")
`.trim(),

  "linear-regression": `
import pandas as pd
import statsmodels.api as sm # pip install statsmodels

df = pd.DataFrame({"x":[1,2,3,4,5], "y":[2,3,5,4,6]})
X = sm.add_constant(df["x"])
m = sm.OLS(df["y"], X).fit()
m.summary()
`.trim(),

  "multiple-regression": `
import pandas as pd
import statsmodels.formula.api as smf # pip install statsmodels

df = pd.DataFrame({
    "y":[10,12,11,9,13,12],
    "x1":[1,2,2,1,3,2],
    "x2":[5,6,7,5,8,7]
})
m = smf.ols("y ~ x1 + x2", data=df).fit()
m.summary()
`.trim(),

  "logistic-regression": `
import pandas as pd
import statsmodels.api as sm
import statsmodels.formula.api as smf # pip install statsmodels

df = pd.DataFrame({"y":[0,0,0,1,1,1,1,0],
                   "x":[1.1,1.5,1.2,2.0,2.2,2.4,2.1,1.3]})
m = smf.glm("y ~ x", data=df, family=sm.families.Binomial()).fit()
m.summary()
`.trim(),

  "poisson-regression": `
import pandas as pd
import statsmodels.api as sm
import statsmodels.formula.api as smf # pip install statsmodels

df = pd.DataFrame({"y":[0,1,2,3,1,2,4,3],
                   "x":[1.0,1.1,1.2,1.3,1.1,1.2,1.4,1.3]})
m = smf.glm("y ~ x", data=df, family=sm.families.Poisson()).fit()
m.summary()
`.trim(),

  "ordinal-regression": `
import pandas as pd
from statsmodels.miscmodels.ordinal_model import OrderedModel # pip install statsmodels

df = pd.DataFrame({
    "y": pd.Categorical([0,0,1,1,2,2,1,0], ordered=True),
    "x": [1.2,1.0,1.5,1.7,2.1,2.0,1.6,1.1]
})
m = OrderedModel(df["y"], df[["x"]], distr="logit").fit(method="bfgs", disp=False)
m.summary()
`.trim(),

  "chi-square": `
import numpy as np
from scipy import stats # pip install scipy

table = np.array([[20, 30, 10],
                  [25, 15, 20]])
chi2, p, dof, expected = stats.chi2_contingency(table, correction=False)
`.trim(),

  "chi-square-2x2": `
import numpy as np
from scipy import stats # pip install scipy

table = np.array([[12, 5],
                  [ 3,10]])
chi2, p, dof, expected = stats.chi2_contingency(table, correction=False)
`.trim(),

  "fisher-freeman-halton": `
import numpy as np
import fisher #pip install fisher-rxc

# Example RxC contingency table (e.g., 3x4 table)
# The data should contain non-negative integer counts
table = [[21, 33, 20, 5],
         [16, 33, 27, 0],
         [10, 15, 12, 4]]

# Calculate the exact p-value
p_value = fisher.exact(table)
`.trim(),

  "fisher-exact": `
import numpy as np
from scipy import stats # pip install scipy

table = np.array([[12, 5],
                  [ 3,10]])
oddsratio, p = stats.fisher_exact(table, alternative="two-sided")
`.trim(),

  "mcnemar-test": `
import numpy as np
from statsmodels.stats.contingency_tables import mcnemar # pip install statsmodels

table = np.array([[30, 5],
                  [10,40]])
res = mcnemar(table, exact=False, correction=True)
`.trim(),

  "linear-mixed-model": `
import pandas as pd
import statsmodels.formula.api as smf # pip install statsmodels

df = pd.DataFrame({
    "y":      [10,11,12, 9,10,11,  13,14,13,  12,11,12],
    "x":      [ 1, 1, 2, 1, 2, 2,   1, 1, 2,   1, 2, 2],
    "group":  ["A","A","A","B","B","B","C","C","C","D","D","D"]
})
m = smf.mixedlm("y ~ x", data=df, groups=df["group"]).fit()
m.summary()
`.trim(),

  "glmm": `
import pandas as pd
import statsmodels.api as sm # pip install statsmodels

# Approximate GLMM via BinomialBayesMixedGLM (random intercept)
df = pd.DataFrame({
    "y":     [0,0,1,1,1,0, 0,1,1,0,1,0],
    "x":     [1,1,2,2,2,1, 1,2,2,1,2,1],
    "group": ["A","A","A","B","B","B","C","C","C","D","D","D"]
})
vc = {"group": "0 + C(group)"}
m = sm.BinomialBayesMixedGLM.from_formula("y ~ x", vc, data=df).fit_vb()
m.summary()
`.trim(),

  "gee": `
import pandas as pd
import statsmodels.api as sm
import statsmodels.formula.api as smf # pip install statsmodels

df = pd.DataFrame({
    "y":  [0,0,1,1,1,0, 0,1,1,0,1,0],
    "x":  [1,1,2,2,2,1, 1,2,2,1,2,1],
    "id": ["A","A","A","B","B","B","C","C","C","D","D","D"]
})
m = smf.gee("y ~ x", groups="id", data=df, family=sm.families.Binomial()).fit()
m.summary()
`.trim(),

  "arima": `
import pandas as pd
import matplotlib.pyplot as plt
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.tsa.stattools import adfuller, kpss # pip install statsmodels matplotlib

y = pd.Series(
    [112,118,132,129,121,135,148,148,136,119,104,118,
     115,126,141,135,125,149,170,170,158,133,114,140,
     145,150,178,163,172,178,199,199,184,162,146,166],
    index=pd.date_range("2021-01-01", periods=36, freq="MS"),
)

# If both trend and seasonality are present, seasonal-difference first, then regular-difference if needed.
y_work = y.diff(12).dropna()
y_work = y_work.diff().dropna()

adfuller(y_work)
kpss(y_work, regression="c", nlags="auto")

fig, axes = plt.subplots(1, 2, figsize=(10, 4))
plot_acf(y_work, lags=8, ax=axes[0])
plot_pacf(y_work, lags=8, ax=axes[1], method="ywm")
plt.tight_layout()

# Compare against ETS and seasonal-naive benchmarks rather than assuming ARIMA is the default winner.
fit = ARIMA(y, order=(1, 1, 1), seasonal_order=(0, 1, 1, 12)).fit()
fit.summary()
`.trim(),

  "exponential-smoothing": `
import pandas as pd
from statsmodels.tsa.holtwinters import ExponentialSmoothing # pip install statsmodels

y = pd.Series(
    [112,118,132,129,121,135,148,148,136,119,104,118,
     115,126,141,135,125,149,170,170,158,133,114,140],
    index=pd.date_range("2022-01-01", periods=24, freq="MS"),
)
fit = ExponentialSmoothing(y, trend="add", seasonal="add", seasonal_periods=12).fit()
fit.forecast(12)
`.trim(),

  "seasonal-naive": `
import numpy as np
import pandas as pd

y = pd.Series(
    [112,118,132,129,121,135,148,148,136,119,104,118,
     115,126,141,135,125,149,170,170,158,133,114,140],
    index=pd.date_range("2022-01-01", periods=24, freq="MS"),
)

h = 12
seasonal_period = 12
last_season = y.iloc[-seasonal_period:].to_numpy()

pd.Series(
    np.resize(last_season, h),
    index=pd.date_range(y.index[-1] + pd.offsets.MonthBegin(), periods=h, freq="MS"),
)
`.trim(),

  "kaplan-meier": `
import pandas as pd
from lifelines import KaplanMeierFitter  # pip install lifelines

df = pd.DataFrame({
    "time":  [5,6,6,2,4,4,3,8],
    "event": [1,0,1,1,0,1,1,0]
})
kmf = KaplanMeierFitter()
kmf.fit(df["time"], event_observed=df["event"])
kmf.survival_function_
`.trim(),

  "log-rank-test": `
import pandas as pd
from lifelines.statistics import logrank_test  # pip install lifelines

df = pd.DataFrame({
    "time":  [5,6,6,2,4,4,3,8,  6,7,3,9,2,5,4,10],
    "event": [1,0,1,1,0,1,1,0,  1,1,0,0,1,1,0,0],
    "group": ["A"]*8 + ["B"]*8
})
a = df[df["group"]=="A"]
b = df[df["group"]=="B"]

res = logrank_test(a["time"], b["time"], event_observed_A=a["event"], event_observed_B=b["event"])
`.trim(),

  "cox-regression": `
import pandas as pd
from lifelines import CoxPHFitter  # pip install lifelines

df = pd.DataFrame({
    "time":  [5,6,6,2,4,4,3,8,  6,7,3,9,2,5,4,10],
    "event": [1,0,1,1,0,1,1,0,  1,1,0,0,1,1,0,0],
    "x":     [0,1,0,1,0,1,0,1,  0,1,0,1,0,1,0,1],
})
cph = CoxPHFitter()
cph.fit(df, duration_col="time", event_col="event")
cph.summary
`.trim(),

  "kmeans": `
import numpy as np
from sklearn.cluster import KMeans # pip install scikit-learn

X = np.array([[1,2],[1,4],[1,0],[10,2],[10,4],[10,0]])
m = KMeans(n_clusters=2, n_init=10, random_state=0).fit(X)
m.labels_, m.cluster_centers_
`.trim(),

  "hierarchical-clustering": `
import numpy as np
from scipy.cluster.hierarchy import linkage, fcluster # pip install scipy

X = np.array([[1,2],[1,4],[1,0],[10,2],[10,4],[10,0]])
Z = linkage(X, method="ward")
labels = fcluster(Z, t=2, criterion="maxclust")
`.trim(),

  "pca": `
import numpy as np
from sklearn.decomposition import PCA # pip install scikit-learn

X = np.array([[1,2,3],[4,5,6],[7,8,9],[2,1,0]])
pca = PCA(n_components=2).fit(X)
pca.explained_variance_ratio_, pca.components_
`.trim(),

  "factor-analysis": `
import numpy as np
from sklearn.decomposition import FactorAnalysis # pip install scikit-learn

X = np.array([[1,2,3],[4,5,6],[7,8,9],[2,1,0],[3,2,1]])
fa = FactorAnalysis(n_components=2, random_state=0).fit(X)
fa.components_
`.trim(),

  "random-forest": `
import numpy as np
from sklearn.ensemble import RandomForestClassifier # pip install scikit-learn

X = np.array([[0,0],[1,1],[1,0],[0,1]])
y = np.array([0,1,1,0])

m = RandomForestClassifier(n_estimators=200, random_state=0).fit(X, y)
m.predict(X)
`.trim(),

  "gradient-boosting": `
import numpy as np
from sklearn.ensemble import GradientBoostingClassifier # pip install scikit-learn

X = np.array([[0,0],[1,1],[1,0],[0,1]])
y = np.array([0,1,1,0])

m = GradientBoostingClassifier(random_state=0).fit(X, y)
m.predict(X)
`.trim(),

  "lasso-ridge": `
import numpy as np
from sklearn.linear_model import Ridge, Lasso # pip install scikit-learn

X = np.array([[1,2],[2,0],[3,1],[4,3],[5,4]])
y = np.array([1,2,2,4,5])

ridge = Ridge(alpha=1.0).fit(X, y)
lasso = Lasso(alpha=0.1).fit(X, y)

ridge.coef_, lasso.coef_
`.trim(),

  "bootstrap": `
import numpy as np

rng = np.random.default_rng(0)
x = np.array([1.2, 0.7, 1.5, 0.9, 1.1])

B = 5000
boot_means = np.array([rng.choice(x, size=len(x), replace=True).mean() for _ in range(B)])
np.quantile(boot_means, [0.025, 0.975])
`.trim(),

  "permutation-test": `
import numpy as np

rng = np.random.default_rng(0)
a = np.array([1,2,3,4,5])
b = np.array([3,4,5,6,7])

obs = a.mean() - b.mean()
combined = np.r_[a, b]
n_a = len(a)

B = 10000
perm_stats = []
for _ in range(B):
    perm = rng.permutation(combined)
    perm_stats.append(perm[:n_a].mean() - perm[n_a:].mean())

p_val = (np.sum(np.abs(perm_stats) >= abs(obs)) + 1) / (B + 1)
`.trim(),

  "cross-validation": `
import numpy as np
from sklearn.model_selection import KFold, cross_val_score 
from sklearn.linear_model import LogisticRegression # pip install scikit-learn

X = np.array([[0,0],[1,1],[1,0],[0,1],[1,2],[2,1]])
y = np.array([0,1,1,0,1,1])

cv = KFold(n_splits=3, shuffle=True, random_state=0)
scores = cross_val_score(LogisticRegression(max_iter=1000), X, y, cv=cv)
scores, scores.mean()
`.trim(),

  "jackknife": `
import numpy as np

x = np.array([1.2, 0.7, 1.5, 0.9, 1.1])
n = len(x)
theta_i = np.array([np.delete(x, i).mean() for i in range(n)])
theta_dot = theta_i.mean()
jack_var = (n-1)/n * np.sum((theta_i - theta_dot)**2)
`.trim(),

  "power-analysis": `
from statsmodels.stats.power import TTestPower # pip install statsmodels

effect_size = 0.5
alpha = 0.05
power = 0.8

n = TTestPower().solve_power(effect_size=effect_size, 
                             alpha=alpha, 
                             power=power, 
                             alternative="two-sided")
`.trim(),

  "bartlett-test": `
import numpy as np
from scipy import stats # pip install scipy

g1 = np.array([5,6,5,7], dtype=float)
g2 = np.array([8,9,7,10], dtype=float)
g3 = np.array([6,5,7,6], dtype=float)

stat, p = stats.bartlett(g1, g2, g3)
`.trim(),

  "brown-forsythe": `
import numpy as np
from scipy import stats # pip install scipy

# Brown-Forsythe is Levene with center='median'
g1 = np.array([5,6,5,7])
g2 = np.array([8,9,7,10])
g3 = np.array([6,5,7,6])

stat, p = stats.levene(g1, g2, g3, center="median")
`.trim(),

  "fligner-killeen": `
import numpy as np
from scipy import stats # pip install scipy

g1 = np.array([5,6,5,7])
g2 = np.array([8,9,7,10])
g3 = np.array([6,5,7,6])

stat, p = stats.fligner(g1, g2, g3)
`.trim(),

  "hartley-fmax": `
import numpy as np

g1 = np.array([5,6,5,7])
g2 = np.array([8,9,7,10])
g3 = np.array([6,5,7,6])

vars_ = np.array([np.var(g, ddof=1) for g in (g1, g2, g3)])
fmax = vars_.max() / vars_.min()
`.trim(),

  "shapiro-wilk": `
import numpy as np
from scipy import stats # pip install scipy

x = np.array([1.2, 0.7, 1.5, 0.9, 1.1])
stat, p = stats.shapiro(x)
`.trim(),

  "kolmogorov-smirnov": `
import numpy as np
from scipy import stats # pip install scipy

x = np.array([1.2, 0.7, 1.5, 0.9, 1.1])
z = (x - x.mean()) / x.std(ddof=1)
stat, p = stats.kstest(z, "norm")
`.trim(),

  "anderson-darling": `
import numpy as np
from scipy import stats # pip install scipy

x = np.array([1.2, 0.7, 1.5, 0.9, 1.1])
res = stats.anderson(x, dist="norm", method="interpolate")
`.trim(),

  "dagostino-pearson": `
import numpy as np
from scipy import stats # pip install scipy

x = np.array([1.2, 0.7, 1.5, 0.9, 1.1, 1.3, 0.8, 1.0])
stat, p = stats.normaltest(x)
`.trim(),

  "levene-test": `
import numpy as np
from scipy import stats # pip install scipy

g1 = np.array([5,6,5,7])
g2 = np.array([8,9,7,10])
g3 = np.array([6,5,7,6])

stat, p = stats.levene(g1, g2, g3, center="median")
`.trim(),

  "durbin-watson": `
import pandas as pd
import statsmodels.api as sm
from statsmodels.stats.stattools import durbin_watson # pip install statsmodels

df = pd.DataFrame({"x":[1,2,3,4,5,6], "y":[2,3,5,4,6,7]})
X = sm.add_constant(df["x"])
m = sm.OLS(df["y"], X).fit()

dw = durbin_watson(m.resid)
`.trim(),

  "breusch-pagan": `
import pandas as pd
import statsmodels.api as sm
from statsmodels.stats.diagnostic import het_breuschpagan # pip install statsmodels

df = pd.DataFrame({"x":[1,2,3,4,5,6], "y":[2,3,5,4,6,7]})
X = sm.add_constant(df["x"])
m = sm.OLS(df["y"], X).fit()

lm_stat, lm_p, f_stat, f_p = het_breuschpagan(m.resid, m.model.exog)
`.trim(),

  "vif": `
import pandas as pd
import statsmodels.api as sm
from statsmodels.stats.outliers_influence import variance_inflation_factor # pip install statsmodels

df = pd.DataFrame({"x1":[1,2,3,4,5,6], "x2":[2,3,4,5,6,7], "y":[2,3,5,4,6,7]})
X = sm.add_constant(df[["x1","x2"]])

vifs = pd.DataFrame({
    "feature": X.columns,
    "VIF": [variance_inflation_factor(X.values, i) for i in range(X.shape[1])]
})
`.trim(),

  "tukey-hsd": `
import numpy as np
import pandas as pd
from statsmodels.stats.multicomp import pairwise_tukeyhsd # pip install statsmodels

g1 = np.array([5,6,5,7])
g2 = np.array([8,9,7,10])
g3 = np.array([6,5,7,6])

df = pd.DataFrame({
    "y": np.r_[g1,g2,g3],
    "group": ["g1"]*len(g1) + ["g2"]*len(g2) + ["g3"]*len(g3)
})

res = pairwise_tukeyhsd(endog=df["y"], groups=df["group"], alpha=0.05)
print(res.summary())
`.trim(),

  "dunnett-test": `
import numpy as np
from scipy.stats import dunnett # pip install scipy

control = np.array([7.40, 8.50, 7.20, 8.24, 9.84, 8.32])
drug_a = np.array([9.76, 8.80, 7.68, 9.36])
drug_b = np.array([12.80, 9.68, 12.16, 9.20, 10.55])

res = dunnett(drug_a, drug_b, control=control)
res.pvalue
`.trim(),

  "games-howell": `
import numpy as np
import pandas as pd
import pingouin as pg  # pip install pingouin

g1 = np.array([5,6,5,7])
g2 = np.array([8,9,7,10])
g3 = np.array([6,5,7,6])

df = pd.DataFrame({
    "y": np.r_[g1,g2,g3],
    "group": ["g1"]*len(g1) + ["g2"]*len(g2) + ["g3"]*len(g3)
})

pg.pairwise_gameshowell(dv="y", between="group", data=df)
`.trim(),

  "scheffe-test": `
import pandas as pd
import scikit_posthocs as sp #pip install scikit-posthocs

x = pd.DataFrame({"a": [1,2,3,5,1], "b": [12,31,54,62,12], "c": [10,12,6,74,11]})
x = x.melt(var_name='groups', value_name='values')
sp.posthoc_scheffe(x, val_col='values', group_col='groups')
`.trim(),

  "dunn-test": `
import numpy as np
import pandas as pd
import scikit_posthocs as sp  # pip install scikit-posthocs

g1 = np.array([1,2,2,3])
g2 = np.array([4,5,4,6])
g3 = np.array([2,3,3,2])

df = pd.DataFrame({"y": np.r_[g1,g2,g3],
                   "group": ["g1"]*len(g1)+["g2"]*len(g2)+["g3"]*len(g3)})

sp.posthoc_dunn(df, val_col="y", group_col="group", p_adjust="bonferroni")
`.trim(),

  "bonferroni": `
import numpy as np

p = np.array([0.01, 0.04, 0.20, 0.003])
p_adj = np.minimum(p * len(p), 1.0)
`.trim(),

  "holm-bonferroni": `
import numpy as np

p = np.array([0.01, 0.04, 0.20, 0.003])
m = len(p)
order = np.argsort(p)
p_sorted = p[order]
adj_sorted = np.maximum.accumulate(np.minimum((m - np.arange(m)) * p_sorted, 1.0))
p_adj = np.empty_like(adj_sorted)
p_adj[order] = adj_sorted
`.trim(),

  "benjamini-hochberg": `
import numpy as np

p = np.array([0.01, 0.04, 0.20, 0.003])
m = len(p)
order = np.argsort(p)
p_sorted = p[order]
bh = p_sorted * m / (np.arange(m) + 1)
bh = np.minimum.accumulate(bh[::-1])[::-1]
bh = np.minimum(bh, 1.0)
p_adj = np.empty_like(bh)
p_adj[order] = bh
`.trim(),

  "welch-t-test": `
import numpy as np
from scipy import stats # pip install scipy

a = np.array([10, 11, 9, 10, 12])
b = np.array([8, 9, 7, 10, 9])
t_stat, p_val = stats.ttest_ind(a, b, equal_var=False)
`.trim(),

  "welch-anova": `
import numpy as np
import pandas as pd
import pingouin as pg # pip install pingouin

g1 = np.array([5, 6, 5, 7])
g2 = np.array([8, 9, 7, 10])
g3 = np.array([6, 5, 7, 6])

df = pd.DataFrame({
    "y": np.r_[g1, g2, g3],
    "group": ["g1"]*len(g1) + ["g2"]*len(g2) + ["g3"]*len(g3),
})
pg.welch_anova(dv="y", between="group", data=df)
`.trim(),

  "ancova": `
import pandas as pd
import statsmodels.formula.api as smf
import statsmodels.api as sm # pip install statsmodels

df = pd.DataFrame({
    "y":     [10,11,9,  12,13,11,  8,9,7,  10,11,9],
    "group": ["A","A","A","A","A","A","B","B","B","B","B","B"],
    "x":     [ 1, 2,1,  2, 3,2,   1,2,1,   2,3,2]
})
model = smf.ols("y ~ C(group) + x", data=df).fit()
sm.stats.anova_lm(model, typ=2)
`.trim(),

  "manova": `
import pandas as pd
from statsmodels.multivariate.manova import MANOVA # pip install statsmodels

df = pd.DataFrame({
    "y1": [5,6,5,  8,9,7],
    "y2": [2,3,2,  5,6,5],
    "group": ["A","A","A","B","B","B"]
})
MANOVA.from_formula("y1 + y2 ~ C(group)", data=df).mv_test()
`.trim(),

  "kendall-tau": `
import numpy as np
from scipy import stats # pip install scipy

x = np.array([1,2,3,4,5])
y = np.array([2,1,4,3,5])
tau, p_val = stats.kendalltau(x, y)
`.trim(),

  "point-biserial": `
import numpy as np
from scipy import stats # pip install scipy

y_bin = np.array([0,1,0,1,1,0])
x_cont = np.array([2.1, 3.4, 1.9, 3.8, 4.0, 2.2])
r, p_val = stats.pointbiserialr(y_bin, x_cont)
`.trim(),

  "cochran-q": `
import pandas as pd
from statsmodels.stats.contingency_tables import cochrans_q # pip install statsmodels

df = pd.DataFrame({
    "c1":[1,0,1,1,0],
    "c2":[1,0,0,1,0],
    "c3":[1,1,0,1,0],
})
res = cochrans_q(df.to_numpy())
stat = res.statistic
p = res.pvalue
`.trim(),

  "negative-binomial": `
import numpy as np
import pandas as pd
import statsmodels.api as sm
import statsmodels.formula.api as smf # pip install statsmodels

df = pd.DataFrame({"y":[0,1,2,3,1,2,4,3],
                   "x":[1.0,1.1,1.2,1.3,1.1,1.2,1.4,1.3]})

# --- GLM (alpha fixed) ---
glm_nb = smf.glm(
    "y ~ x",
    data=df,
    family=sm.families.NegativeBinomial(alpha=0.8)
).fit()

print(glm_nb.summary())

# --- Discrete NegativeBinomial (alpha estimated) ---
X = sm.add_constant(df["x"])
disc_nb = sm.NegativeBinomial(df["y"], X).fit(disp=0)

print(disc_nb.summary())
print("params:", disc_nb.params)
print("alpha:", float(disc_nb.params["alpha"]) if "alpha" in disc_nb.params.index else float(disc_nb.params[-1]))
`.trim(),

  "zero-inflated-poisson": `
import pandas as pd
import statsmodels.api as sm
from statsmodels.discrete.count_model import ZeroInflatedPoisson # pip install statsmodels

df = pd.DataFrame({"y":[0,0,0,1,0,2,0,3,0,1],
                   "x":[1,2,1,2,1,2,1,2,1,2]})
exog = sm.add_constant(df["x"])
m = ZeroInflatedPoisson(df["y"], exog, exog_infl=exog, inflation="logit").fit(disp=0)
m.summary()
`.trim(),

  "quantile-regression": `
import pandas as pd
import statsmodels.formula.api as smf # pip install statsmodels

df = pd.DataFrame({"y":[1,2,3,4,10,12], "x":[1,2,3,4,5,6]})
m = smf.quantreg("y ~ x", data=df).fit(q=0.5)
m.summary()
`.trim(),

  "robust-regression": `
import pandas as pd
import statsmodels.api as sm # pip install statsmodels

df = pd.DataFrame({"y":[1,2,3,4,10,12], "x":[1,2,3,4,5,6]})
X = sm.add_constant(df["x"])
m = sm.RLM(df["y"], X).fit()
m.summary()
`.trim(),

  "probit-regression": `
import pandas as pd
import statsmodels.api as sm
import statsmodels.formula.api as smf # pip install statsmodels

df = pd.DataFrame({"y":[0,0,0,1,1,1,1,0],
                   "x":[1.1,1.5,1.2,2.0,2.2,2.4,2.1,1.3]})
m = smf.glm("y ~ x", data=df,
            family=sm.families.Binomial(link=sm.families.links.probit())).fit()
m.summary()
`.trim(),

  "svm": `
import numpy as np
from sklearn.svm import SVC # pip install scikit-learn

X = np.array([[0,0],[1,1],[1,0],[0,1]])
y = np.array([0,1,1,0])

m = SVC(kernel="rbf", probability=True, random_state=0).fit(X, y)
m.predict(X)
`.trim(),

  "xgboost": `
import numpy as np
import xgboost as xgb # pip install xgboost

X = np.array([[0,0],[1,1],[1,0],[0,1]])
y = np.array([0,1,1,0])

m = xgb.XGBClassifier(
    n_estimators=200,
    max_depth=3,
    learning_rate=0.1,
    random_state=0,
    min_child_weight=0,   # allow splits with tiny Hessian sums
    eval_metric="logloss"
)

m.fit(X, y)
print(m.predict(X))
print(m.predict_proba(X))
`.trim(),

  "lightgbm": `
import numpy as np
import lightgbm as lgb # pip install lightgbm

# code not functional without dataset
clf = lgb.LGBMClassifier() # see documentation for parameters
clf.fit(X_train, y_train)
y_pred=clf.predict(X_test)
`.trim(),

  "catboost": `
import numpy as np
from catboost import CatBoostClassifier # pip install catboost

X = np.array([[0,0],[1,1],[1,0],[0,1]])
y = np.array([0,1,1,0])

m = CatBoostClassifier(iterations=200, depth=3, learning_rate=0.1, verbose=False, random_state=0)
m.fit(X, y)
m.predict(X)
`.trim(),

  "knn": `
import numpy as np
from sklearn.neighbors import KNeighborsClassifier # pip install scikit-learn

X = np.array([[0,0],[1,1],[1,0],[0,1]])
y = np.array([0,1,1,0])

m = KNeighborsClassifier(n_neighbors=3).fit(X, y)
m.predict(X)
`.trim(),

  "naive-bayes": `
import numpy as np
from sklearn.naive_bayes import GaussianNB # pip install scikit-learn

X = np.array([[0.0,0.0],[1.0,1.0],[1.0,0.0],[0.0,1.0]])
y = np.array([0,1,1,0])

m = GaussianNB().fit(X, y)
m.predict(X)
`.trim(),

  "decision-tree": `
import numpy as np
from sklearn.tree import DecisionTreeClassifier # pip install scikit-learn

X = np.array([[0,0],[1,1],[1,0],[0,1]])
y = np.array([0,1,1,0])

m = DecisionTreeClassifier(random_state=0).fit(X, y)
m.predict(X)
`.trim(),

  "elastic-net": `
import numpy as np
from sklearn.linear_model import ElasticNet # pip install scikit-learn

X = np.array([[1,2],[2,0],[3,1],[4,3],[5,4]])
y = np.array([1,2,2,4,5])

m = ElasticNet(alpha=0.1, l1_ratio=0.5, random_state=0).fit(X, y)
m.coef_
`.trim(),

  "neural-network-mlp": `
import numpy as np
from sklearn.neural_network import MLPClassifier # pip install scikit-learn

X = np.array([[0,0],[1,1],[1,0],[0,1]])
y = np.array([0,1,1,0])

m = MLPClassifier(hidden_layer_sizes=(10,), max_iter=2000, random_state=0).fit(X, y)
m.predict(X)
`.trim(),

  "dbscan": `
import numpy as np
from sklearn.cluster import DBSCAN # pip install scikit-learn

X = np.array([[1,2],[1,4],[1,0],[10,2],[10,4],[10,0]])
labels = DBSCAN(eps=3, min_samples=2).fit_predict(X)
`.trim(),

  "gaussian-mixture": `
import numpy as np
from sklearn.mixture import GaussianMixture # pip install scikit-learn

X = np.array([[1,2],[1,4],[1,0],[10,2],[10,4],[10,0]])
m = GaussianMixture(n_components=2, random_state=0).fit(X)
m.predict(X), m.means_
`.trim(),

  "tsne": `
import numpy as np
from sklearn.manifold import TSNE # pip install scikit-learn

X = np.random.RandomState(0).randn(50, 10)
emb = TSNE(n_components=2, perplexity=10, random_state=0).fit_transform(X)
emb[:5]
`.trim(),

  "umap": `
import numpy as np
import umap  # pip install umap-learn

X = np.random.RandomState(0).randn(100, 10)
reducer = umap.UMAP(n_components=2, random_state=0)
emb = reducer.fit_transform(X)
emb[:5]
`.trim(),

  "prophet": `
import pandas as pd
from prophet import Prophet  # pip install prophet

df = pd.DataFrame({
    "ds": pd.date_range("2020-01-01", periods=24, freq="ME"),
    "y":  [112,118,132,129,121,135,148,148,136,119,104,118,
           115,120,134,130,125,137,150,149,140,122,110,121]
})
m = Prophet()
m.fit(df)
future = m.make_future_dataframe(periods=6, freq="ME")
forecast = m.predict(future)
forecast[["ds","yhat","yhat_lower","yhat_upper"]].tail(10)
`.trim(),

  "adf-test": `
import pandas as pd
from statsmodels.tsa.stattools import adfuller # pip install statsmodels

y = pd.Series([112,118,132,129,121,135,148,148,136,119,104,118,115,126,141,135])
y_work = y.diff().dropna()

adfuller(y_work)
`.trim(),

  "kpss-test": `
import pandas as pd
from statsmodels.tsa.stattools import kpss # pip install statsmodels

y = pd.Series([112,118,132,129,121,135,148,148,136,119,104,118,115,126,141,135])
y_work = y.diff().dropna()

kpss(y_work, regression="c", nlags="auto")
`.trim(),

  "acf-pacf": `
import pandas as pd
import matplotlib.pyplot as plt
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf # pip install statsmodels matplotlib

y = pd.Series([112,118,132,129,121,135,148,148,136,119,104,118,115,126,141,135])
y_work = y.diff().dropna()

fig, axes = plt.subplots(1, 2, figsize=(10, 4))
plot_acf(y_work, lags=6, ax=axes[0])
plot_pacf(y_work, lags=6, ax=axes[1], method="ywm")
plt.tight_layout()
`.trim(),

  "granger-causality": `
import numpy as np
import pandas as pd
from statsmodels.tsa.stattools import grangercausalitytests # pip install statsmodels

np.random.seed(0)
n = 200
x = np.random.normal(size=n)
y = np.zeros(n)
for t in range(2, n):
    y[t] = 0.6*y[t-1] + 0.4*x[t-1] + np.random.normal(scale=0.5)

data = pd.DataFrame({"y": y, "x": x})
res = grangercausalitytests(data[["y","x"]], maxlag=2)
`.trim(),

  "ljung-box": `
import pandas as pd
from statsmodels.stats.diagnostic import acorr_ljungbox
from statsmodels.tsa.holtwinters import ExponentialSmoothing # pip install statsmodels

y = pd.Series(
    [112,118,132,129,121,135,148,148,136,119,104,118,
     115,126,141,135,125,149,170,170,158,133,114,140],
    index=pd.date_range("2022-01-01", periods=24, freq="MS"),
)
fit = ExponentialSmoothing(y, trend="add", seasonal="add", seasonal_periods=12).fit()

acorr_ljungbox((y - fit.fittedvalues).dropna(), lags=[12], return_df=True)
`.trim(),

  "forecast-residual-diagnostics": `
import matplotlib.pyplot as plt
import pandas as pd
from scipy import stats
from statsmodels.graphics.tsaplots import plot_acf
from statsmodels.tsa.holtwinters import ExponentialSmoothing # pip install statsmodels scipy matplotlib

y = pd.Series(
    [112,118,132,129,121,135,148,148,136,119,104,118,
     115,126,141,135,125,149,170,170,158,133,114,140],
    index=pd.date_range("2022-01-01", periods=24, freq="MS"),
)
fit = ExponentialSmoothing(y, trend="add", seasonal="add", seasonal_periods=12).fit()
resid = (y - fit.fittedvalues).dropna()

fig, axes = plt.subplots(1, 3, figsize=(12, 3))
axes[0].plot(resid)
axes[0].axhline(0, color="black", linewidth=1)
axes[0].set_title("Residuals")
plot_acf(resid, lags=12, ax=axes[1])
stats.probplot(resid, dist="norm", plot=axes[2])
plt.tight_layout()
`.trim(),

  "var": `
import pandas as pd
from statsmodels.tsa.api import VAR # pip install statsmodels

df = pd.DataFrame({
    "y": [1,2,3,4,5,6,7,8,9,10],
    "x": [2,2,3,3,4,4,5,5,6,6],
})
m = VAR(df).fit(maxlags=1)
m.summary()
`.trim(),

  "bayesian-t-test": `
import numpy as np
import pymc as pm
import arviz as az # pip install arviz

# Example data (two independent groups)
iq_drug = np.array([
    101,100,102,104,102,97,105,105,98,101,100,123,105,103,100,95,102,106,109,
    102,82,102,100,102,102,101,102,102,103,103,97,97,103,101,97,104,96,103,
    124,101,101,100,101,101,104,100,101
])
iq_placebo = np.array([
    99,101,100,101,102,100,97,101,104,101,102,102,100,105,88,101,100,104,
    100,100,100,101,102,103,97,101,101,100,101,99,101,100,100,101,100,99,
    101,100,102,99,100,99
])

pooled = np.r_[iq_drug, iq_placebo]
mu_m = pooled.mean()
mu_s = pooled.std() * 2  # diffuse prior scale like the PyMC BEST example

with pm.Model() as best:
    mu1 = pm.Normal("mu1", mu=mu_m, sigma=mu_s)
    mu2 = pm.Normal("mu2", mu=mu_m, sigma=mu_s)

    sd1 = pm.Uniform("sd1", lower=0.1, upper=10)
    sd2 = pm.Uniform("sd2", lower=0.1, upper=10)

    nu_minus_one = pm.Exponential("nu_minus_one", 1 / 29.0)
    nu = pm.Deterministic("nu", nu_minus_one + 1)

    pm.StudentT("y1", nu=nu, mu=mu1, sigma=sd1, observed=iq_drug)
    pm.StudentT("y2", nu=nu, mu=mu2, sigma=sd2, observed=iq_placebo)

    diff = pm.Deterministic("diff_means", mu1 - mu2)
    effect = pm.Deterministic("effect_size", diff / np.sqrt((sd1**2 + sd2**2) / 2))

    idata = pm.sample(1000, tune=1000, chains=4, target_accept=0.9)

print(az.summary(idata, var_names=["diff_means", "effect_size", "nu"]))
az.plot_posterior(idata, var_names=["diff_means", "effect_size"], ref_val=0)
`.trim(),

  "bayesian-regression": `
import bambi as bmb # pip install bambi
import arviz as az

# Bayesian Logistic Regression
data = pd.DataFrame({
    "g": np.random.choice(["Yes", "No"], size=50),
    "x1": np.random.normal(size=50),
    "x2": np.random.normal(size=50)
})
model = bmb.Model("g['Yes'] ~ x1 + x2", data, family="bernoulli")
results = model.fit()
az.summary(results)
az.plot_trace(results)

# Bayesian Linear Regression
data = bmb.load_data("sleepstudy")
model = bmb.Model('Reaction ~ Days', data)
print(model)
results = model.fit(draws=1000)
az.summary(results)
az.plot_trace(results)
`.trim(),

  "bayesian-anova": `
# See notebook link for full example
# https://github.com/pjofrelora/BlogNotebooks/blob/master/ANOVA%20in%20Bayesian%20Framework.ipynb
`.trim(),

  "accelerated-failure-time": `
import pandas as pd
from lifelines import WeibullAFTFitter  # pip install lifelines

df = pd.DataFrame({
    "time":  [5,6,6,2,4,4,3,8,  6,7,3,9,2,5,4,10],
    "event": [1,0,1,1,0,1,1,0,  1,1,0,0,1,1,0,0],
    "x":     [0,1,0,1,0,1,0,1,  0,1,0,1,0,1,0,1],
})
aft = WeibullAFTFitter()
aft.fit(df, duration_col="time", event_col="event")
aft.summary
`.trim(),

  "competing-risks": `
import pandas as pd
from lifelines import AalenJohansenFitter  # pip install lifelines

df = pd.DataFrame({
    "time": [2,3,4,5,6,7,8,9],
    "event_type": [1,1,2,1,0,2,1,2]  # 0=censored, 1=cause1, 2=cause2
})

ajf = AalenJohansenFitter()
ajf.fit(
    durations=df["time"],
    event_observed=df["event_type"],
    event_of_interest=1,   # cause 1
)
ajf.cumulative_density_
`.trim(),

  "random-survival-forest": `
# https://scikit-survival.readthedocs.io/en/stable/user_guide/random-survival-forest.html
`.trim(),

  "cohens-d": `
import numpy as np

a = np.array([10,11,9,10,12])
b = np.array([8,9,7,10,9])

sp = np.sqrt(((a.size-1)*a.var(ddof=1) + (b.size-1)*b.var(ddof=1)) / (a.size + b.size - 2))
d = (a.mean() - b.mean()) / sp
`.trim(),

  "hedges-g": `
import numpy as np

a = np.array([10,11,9,10,12])
b = np.array([8,9,7,10,9])

n1, n2 = a.size, b.size
sp = np.sqrt(((n1-1)*a.var(ddof=1) + (n2-1)*b.var(ddof=1)) / (n1 + n2 - 2))
d = (a.mean() - b.mean()) / sp
J = 1 - (3 / (4*(n1+n2) - 9))
g = J * d
`.trim(),

  "eta-squared": `
import numpy as np
import pandas as pd
import statsmodels.api as sm
import statsmodels.formula.api as smf

df = pd.DataFrame({
    "y": [5,6,5,7, 8,9,7,10, 6,5,7,6],
    "group": ["g1"]*4 + ["g2"]*4 + ["g3"]*4
})
m = smf.ols("y ~ C(group)", data=df).fit()
anova = sm.stats.anova_lm(m, typ=2)

ss_effect = anova.loc["C(group)", "sum_sq"]
ss_error  = anova.loc["Residual", "sum_sq"]
ss_total  = ss_effect + ss_error

eta_sq = ss_effect / ss_total
partial_eta_sq = ss_effect / (ss_effect + ss_error)
`.trim(),

  "odds-ratio": `
import numpy as np

table = np.array([[12, 5],
                  [ 3,10]])
a,b,c,d = table[0,0], table[0,1], table[1,0], table[1,1]
or_ = (a*d) / (b*c)
`.trim(),

  "cramers-v": `
import numpy as np
from scipy import stats

table = np.array([[20, 30, 10],
                  [25, 15, 20]])
chi2, p, dof, expected = stats.chi2_contingency(table, correction=False)
n = table.sum()
r, c = table.shape
V = np.sqrt(chi2 / (n * (min(r-1, c-1))))
`.trim(),

  "omega-squared": `
import numpy as np
import pandas as pd
import statsmodels.api as sm
import statsmodels.formula.api as smf

df = pd.DataFrame({
    "y": [5,6,5,7, 8,9,7,10, 6,5,7,6],
    "group": ["g1"]*4 + ["g2"]*4 + ["g3"]*4
})
m = smf.ols("y ~ C(group)", data=df).fit()
anova = sm.stats.anova_lm(m, typ=2)

ss_effect = anova.loc["C(group)", "sum_sq"]
df_effect = anova.loc["C(group)", "df"]
ss_error  = anova.loc["Residual", "sum_sq"]
df_error  = anova.loc["Residual", "df"]
ms_error = ss_error / df_error
ss_total = ss_effect + ss_error

omega_sq = (ss_effect - df_effect * ms_error) / (ss_total + ms_error)
`.trim(),

  "epsilon-squared": `
import numpy as np
from scipy import stats

g1 = np.array([1,2,2,3])
g2 = np.array([4,5,4,6])
g3 = np.array([2,3,3,2])
H, p = stats.kruskal(g1, g2, g3)

n = len(g1) + len(g2) + len(g3)
k = 3
eps_sq = (H - k + 1) / (n - k)
`.trim(),

  "rank-biserial": `
import numpy as np
from scipy.stats import mannwhitneyu # pip install scipy

group_a = np.array([12, 9, 10, 13, 11, 8])
group_b = np.array([15, 14, 16, 13, 17, 14])

u, p = mannwhitneyu(group_a, group_b, alternative="two-sided")

# Rank-biserial correlation (use the smaller U for a two-sided test)
n1, n2 = len(group_a), len(group_b)
u_small = min(u, n1 * n2 - u)
r_rb = 1 - (2 * u_small) / (n1 * n2)

print("Group A:", group_a.tolist())
print("Group B:", group_b.tolist())
print(f"Mann–Whitney U = {u:.3f}, p-value = {p:.5f}")
print(f"Rank-biserial r = {r_rb:.3f}  (0=no effect, 1=complete separation)")
`.trim(),

  "phi-coefficient": `
import numpy as np

table = np.array([[12, 5],
                  [ 3,10]])
a,b,c,d = table[0,0], table[0,1], table[1,0], table[1,1]
phi = (a*d - b*c) / np.sqrt((a+b)*(c+d)*(a+c)*(b+d))
`.trim(),

  "risk-ratio": `
import numpy as np

table = np.array([[12, 5],
                  [ 3,10]])
# assume rows: exposed/unexposed, cols: event/no-event (adjust if your convention differs)
event_exp, none_exp = table[0,0], table[0,1]
event_unexp, none_unexp = table[1,0], table[1,1]

risk_exp = event_exp / (event_exp + none_exp)
risk_unexp = event_unexp / (event_unexp + none_unexp)

RR = risk_exp / risk_unexp
`.trim(),

  "risk-difference": `
import numpy as np

table = np.array([[12, 5],
                  [ 3,10]])
# assume rows: exposed/unexposed, cols: event/no-event (adjust if your convention differs)
event_exp, none_exp = table[0,0], table[0,1]
event_unexp, none_unexp = table[1,0], table[1,1]

risk_exp = event_exp / (event_exp + none_exp)
risk_unexp = event_unexp / (event_unexp + none_unexp)

RD = risk_exp - risk_unexp
`.trim(),

  "cohens-kappa": `
import numpy as np

# confusion matrix between rater1 and rater2
cm = np.array([[35, 5],
               [10,50]])
n = cm.sum()
po = np.trace(cm) / n
pe = (cm.sum(axis=1) @ cm.sum(axis=0)) / (n**2)
kappa = (po - pe) / (1 - pe)
`.trim(),

  "fleiss-kappa": `
import numpy as np

# N subjects, k categories; each row sums to n_raters
# Example: 5 subjects rated by 3 raters into 2 categories
ratings = np.array([
    [3,0],
    [2,1],
    [1,2],
    [0,3],
    [2,1],
], dtype=float)

N, k = ratings.shape
n = ratings.sum(axis=1)[0]

p_j = ratings.sum(axis=0) / (N*n)
P_i = (np.sum(ratings**2, axis=1) - n) / (n*(n-1))
P_bar = P_i.mean()
P_e = np.sum(p_j**2)
kappa = (P_bar - P_e) / (1 - P_e)
`.trim(),

  "intraclass-correlation": `
import pandas as pd
import pingouin as pg  # pip install pingouin

df = pd.DataFrame({
    "targets": np.repeat(np.arange(1,6), 3),
    "raters":  np.tile(["r1","r2","r3"], 5),
    "scores":  [10,11,10,  9,9,10,  7,8,8,  12,11,12,  5,6,5]
})
pg.intraclass_corr(data=df, targets="targets", raters="raters", ratings="scores")
`.trim()
};
