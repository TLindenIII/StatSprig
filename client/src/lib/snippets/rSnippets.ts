
export const rSnippets: Record<string, string> = {
  "one-sample-t-test": `
x <- c(12, 10, 9, 11, 13, 8, 10, 12)
t.test(x, mu = 10)
`.trim(),

  "one-proportion-z-test": `
x <- 56
n <- 100
p0 <- 0.5
prop.test(x, n, p = p0, correct = FALSE)
`.trim(),

  "binomial-test": `
x <- 56
n <- 100
binom.test(x, n, p = 0.5)
`.trim(),

  "t-test-independent": `
g1 <- c(5, 6, 5, 7, 6)
g2 <- c(8, 9, 7, 10, 9)
t.test(g1, g2, var.equal = TRUE)
`.trim(),

  "paired-t-test": `
before <- c(10, 12, 9, 11, 13)
after  <- c(11, 12, 10, 12, 14)
t.test(before, after, paired = TRUE)
`.trim(),

  "one-way-anova": `
df <- data.frame(
  y = c(5,6,5,7,  8,9,7,10,  6,5,7,6),
  group = factor(rep(c("g1","g2","g3"), each = 4))
)
fit <- aov(y ~ group, data = df)
summary(fit)
`.trim(),

  "two-way-anova": `
df <- expand.grid(
  A = factor(c("low","high")),
  B = factor(c("ctrl","treat")),
  rep = 1:6
)
df$y <- 10 + ifelse(df$A=="high", 2, 0) + ifelse(df$B=="treat", 1, 0) + rnorm(nrow(df), 0, 1)

fit <- aov(y ~ A * B, data = df)
summary(fit)
`.trim(),

  "repeated-measures-anova": `
df <- data.frame(
  id = factor(rep(1:12, each = 3)),
  time = factor(rep(c("t1","t2","t3"), times = 12)),
  y = c(
    10,11,12,  9,10,11,  8,9,10,  10,10,11,
    11,12,13,  9,9,10,   8,8,9,   10,11,11,
    12,13,14,  9,10,10,  8,9,9,   11,11,12
  )
)

fit <- aov(y ~ time + Error(id/time), data = df)
summary(fit)
`.trim(),

  "two-proportion-z-test": `
x <- c(56, 48)
n <- c(100, 90)
prop.test(x, n, correct = FALSE)
`.trim(),

  "mann-whitney": `
g1 <- c(5, 6, 5, 7, 6)
g2 <- c(8, 9, 7, 10, 9)
wilcox.test(g1, g2, exact = FALSE)
`.trim(),

  "wilcoxon-signed-rank": `
before <- c(10, 12, 9, 11, 13)
after  <- c(11, 12, 10, 12, 14)
wilcox.test(before, after, paired = TRUE, exact = FALSE)
`.trim(),

  "kruskal-wallis": `
df <- data.frame(
  y = c(5,6,5,7,  8,9,7,10,  6,5,7,6),
  group = factor(rep(c("g1","g2","g3"), each = 4))
)
kruskal.test(y ~ group, data = df)
`.trim(),

  "friedman-test": `
df <- data.frame(
  id = factor(rep(1:10, each = 3)),
  cond = factor(rep(c("c1","c2","c3"), times = 10)),
  y = c(
    10,11,12,  9,10,12,  8,9,10,  10,10,11,  11,12,13,
    9,9,10,    8,8,9,    10,11,11,  12,13,14,  9,10,10
  )
)
friedman.test(y ~ cond | id, data = df)
`.trim(),

  "pearson-correlation": `
x <- c(1,2,3,4,5,6,7,8)
y <- c(2,1,4,3,5,7,6,8)
cor.test(x, y, method = "pearson")
`.trim(),

  "spearman-correlation": `
x <- c(1,2,3,4,5,6,7,8)
y <- c(2,1,4,3,5,7,6,8)
cor.test(x, y, method = "spearman")
`.trim(),

  "partial-correlation": `
if (!requireNamespace("ppcor", quietly = TRUE)) install.packages("ppcor")
library(ppcor)

df <- data.frame(
  x = c(1,2,3,4,5,6,7,8),
  y = c(2,1,4,3,5,7,6,8),
  z = c(8,7,6,5,4,3,2,1)
)
pcor.test(df$x, df$y, df$z)
`.trim(),

  "linear-regression": `
df <- data.frame(
  y = c(1,2,3,4,5,6),
  x = c(1,1,2,2,3,3)
)
fit <- lm(y ~ x, data = df)
summary(fit)
`.trim(),

  "multiple-regression": `
df <- data.frame(
  y = c(3,4,5,6,7,8,9,10),
  x1 = c(1,1,2,2,3,3,4,4),
  x2 = c(8,7,6,5,4,3,2,1)
)
fit <- lm(y ~ x1 + x2, data = df)
summary(fit)
`.trim(),

  "logistic-regression": `
df <- data.frame(
  y = c(0,0,0,1,0,1,1,1),
  x = c(1,2,1,2,1,2,1,2)
)
fit <- glm(y ~ x, data = df, family = binomial())
summary(fit)
`.trim(),

  "poisson-regression": `
df <- data.frame(
  y = c(0,1,2,3,1,2,4,3),
  x = c(1.0,1.1,1.2,1.3,1.1,1.2,1.4,1.3)
)
fit <- glm(y ~ x, data = df, family = poisson())
summary(fit)
`.trim(),

  "ordinal-regression": `
if (!requireNamespace("MASS", quietly = TRUE)) install.packages("MASS")
library(MASS)

df <- data.frame(
  y = ordered(c("low","low","med","med","high","high","med","low"),
              levels = c("low","med","high")),
  x = c(1,2,1,2,3,3,2,1)
)
fit <- polr(y ~ x, data = df, Hess = TRUE)
summary(fit)
`.trim(),

  "chi-square": `
tab <- matrix(c(30, 20, 10, 40), nrow = 2, byrow = TRUE)
dimnames(tab) <- list(
  Group = c("A","B"),
  Outcome = c("Yes","No")
)
chisq.test(tab, correct = FALSE)
`.trim(),

  "chi-square-2x2": `
tab <- matrix(c(12, 5, 3, 10), nrow = 2, byrow = TRUE)
chisq.test(tab, correct = TRUE)
`.trim(),

  "fisher-freeman-halton": `
if (!requireNamespace("rcompanion", quietly = TRUE)) install.packages("rcompanion")
library(rcompanion)

tab <- matrix(c(4,1,2,
                3,5,1,
                2,2,6), nrow = 3, byrow = TRUE)
dimnames(tab) <- list(Row = c("R1","R2","R3"), Col = c("C1","C2","C3"))
fisher.test(tab, simulate.p.value = TRUE, B = 20000)
`.trim(),

  "fisher-exact": `
tab <- matrix(c(1,9,11,3), nrow = 2, byrow = TRUE)
fisher.test(tab)
`.trim(),

  "mcnemar-test": `
tab <- matrix(c(20, 5,
                2, 18), nrow = 2, byrow = TRUE)
dimnames(tab) <- list(
  Pre = c("No","Yes"),
  Post = c("No","Yes")
)
mcnemar.test(tab, correct = TRUE)
`.trim(),

  "linear-mixed-model": `
if (!requireNamespace("lme4", quietly = TRUE)) install.packages("lme4")
library(lme4)

df <- data.frame(
  y = c(10,11,9,10,  12,13,11,12,  8,9,7,8),
  x = c(1,1,2,2,  1,1,2,2,  1,1,2,2),
  subject = factor(rep(1:6, each = 2))
)
fit <- lmer(y ~ x + (1 | subject), data = df)
summary(fit)
`.trim(),

  "glmm": `
if (!requireNamespace("lme4", quietly = TRUE)) install.packages("lme4")
library(lme4)

df <- data.frame(
  y = c(0,1,0,1, 0,1,1,1, 0,0,1,1),
  x = c(1,2,1,2, 1,2,1,2, 1,2,1,2),
  subject = factor(rep(1:6, each = 2))
)
fit <- glmer(y ~ x + (1 | subject), data = df, family = binomial())
summary(fit)
`.trim(),

  "gee": `
if (!requireNamespace("geepack", quietly = TRUE)) install.packages("geepack")
library(geepack)

df <- data.frame(
  id = factor(rep(1:8, each = 3)),
  time = rep(1:3, times = 8),
  y = c(0,0,1, 0,1,1, 0,0,0, 1,1,1, 0,1,0, 1,1,1, 0,0,1, 0,1,1),
  x = rep(c(0,1), length.out = 24)
)
fit <- geeglm(y ~ x + time, id = id, data = df, family = binomial(), corstr = "exchangeable")
summary(fit)
`.trim(),

  "arima": `
x <- ts(cumsum(rnorm(120)), frequency = 12, start = c(2015, 1))
fit <- arima(x, order = c(1,1,1))
`.trim(),

  "exponential-smoothing": `
if (!requireNamespace("forecast", quietly = TRUE)) install.packages("forecast")
library(forecast)

x <- ts(10 + cumsum(rnorm(60)), frequency = 12, start = c(2020, 1))
fit <- ets(x)
forecast(fit, h = 12)
`.trim(),

  "kaplan-meier": `
if (!requireNamespace("survival", quietly = TRUE)) install.packages("survival")
library(survival)

df <- data.frame(
  time = c(5,8,12,3,9,10,4,7),
  status = c(1,1,0,1,0,1,1,0)
)
fit <- survfit(Surv(time, status) ~ 1, data = df)
summary(fit)
`.trim(),

  "log-rank-test": `
if (!requireNamespace("survival", quietly = TRUE)) install.packages("survival")
library(survival)

df <- data.frame(
  time = c(5,8,12,3,9,10, 4,7,6,11,2,13),
  status = c(1,1,0,1,0,1, 1,0,1,0,1,0),
  group = factor(rep(c("A","B"), each = 6))
)
survdiff(Surv(time, status) ~ group, data = df, subset = NULL, na.action = na.omit)
`.trim(),

  "cox-regression": `
if (!requireNamespace("survival", quietly = TRUE)) install.packages("survival")
library(survival)

df <- data.frame(
  time = c(5,8,12,3,9,10,4,7,6,11,2,13),
  status = c(1,1,0,1,0,1,1,0,1,0,1,0),
  x = c(0,1,0,1,0,1,0,1, 0,1,0,1)
)
fit <- coxph(Surv(time, status) ~ x, data = df)
summary(fit)
`.trim(),

  "kmeans": `
X <- matrix(rnorm(200), ncol = 2)
fit <- kmeans(X, centers = 3, nstart = 10)
fit$centers
`.trim(),

  "hierarchical-clustering": `
X <- matrix(rnorm(200), ncol = 2)
d <- dist(X)
hc <- hclust(d, method = "ward.D2")
cutree(hc, k = 3)
`.trim(),

  "pca": `
X <- scale(matrix(rnorm(300), ncol = 3))
fit <- prcomp(X, center = TRUE, scale. = TRUE)
summary(fit)
`.trim(),

  "factor-analysis": `
X <- matrix(rnorm(500), ncol = 5)
fit <- factanal(X, factors = 2, rotation = "varimax")
`.trim(),

  "random-forest": `
if (!requireNamespace("randomForest", quietly = TRUE)) install.packages("randomForest")
library(randomForest)


df <- data.frame(
  y = factor(sample(c("A","B"), 200, replace = TRUE)),
  x1 = rnorm(200),
  x2 = rnorm(200),
  x3 = rnorm(200)
)
fit <- randomForest(y ~ ., data = df, ntree = 200)
`.trim(),

  "gradient-boosting": `
if (!requireNamespace("gbm", quietly = TRUE)) install.packages("gbm")
library(gbm)


df <- data.frame(
  y = rnorm(300),
  x1 = rnorm(300),
  x2 = rnorm(300),
  x3 = rnorm(300)
)
fit <- gbm(y ~ ., data = df, distribution = "gaussian",
           n.trees = 500, interaction.depth = 2,
           shrinkage = 0.05, n.minobsinnode = 10, verbose = FALSE)
summary(fit)
`.trim(),

  "lasso-ridge": `
if (!requireNamespace("glmnet", quietly = TRUE)) install.packages("glmnet")
library(glmnet)


X <- matrix(rnorm(200 * 10), nrow = 200, ncol = 10)
y <- rnorm(200)

fit_lasso <- cv.glmnet(X, y, alpha = 1)
fit_ridge <- cv.glmnet(X, y, alpha = 0)

coef(fit_lasso, s = "lambda.min")
coef(fit_ridge, s = "lambda.min")
`.trim(),

  "bootstrap": `
x <- rnorm(50)

B <- 2000
boot_means <- replicate(B, mean(sample(x, replace = TRUE)))
quantile(boot_means, c(0.025, 0.975))
`.trim(),

  "permutation-test": `
g1 <- rnorm(20, mean = 0)
g2 <- rnorm(20, mean = 0.6)

obs <- mean(g2) - mean(g1)

B <- 5000
perm <- replicate(B, {
  all <- c(g1, g2)
  idx <- sample(seq_along(all))
  g1p <- all[idx[1:length(g1)]]
  g2p <- all[idx[(length(g1)+1):length(all)]]
  mean(g2p) - mean(g1p)
})

mean(abs(perm) >= abs(obs))
`.trim(),

  "cross-validation": `
if (!requireNamespace("caret", quietly = TRUE)) install.packages("caret")
library(caret)


df <- data.frame(
  y = rnorm(200),
  x1 = rnorm(200),
  x2 = rnorm(200)
)

ctrl <- trainControl(method = "cv", number = 5)
fit <- train(y ~ x1 + x2, data = df, method = "lm", trControl = ctrl)
`.trim(),

  "jackknife": `
x <- rnorm(30)
theta_hat <- mean(x)

jack <- sapply(seq_along(x), function(i) mean(x[-i]))
jack_se <- sqrt((length(x) - 1) * mean((jack - mean(jack))^2))
list(theta_hat = theta_hat, jackknife_se = jack_se)
`.trim(),

  "power-analysis": `
if (!requireNamespace("pwr", quietly = TRUE)) install.packages("pwr")
library(pwr)

pwr.t.test(d = 0.5, sig.level = 0.05, power = 0.8, type = "two.sample")
`.trim(),

  "bartlett-test": `
df <- data.frame(
  y = c(rnorm(20, 0, 1), rnorm(20, 0, 2), rnorm(20, 0, 1.5)),
  group = factor(rep(c("g1","g2","g3"), each = 20))
)
bartlett.test(y ~ group, data = df)
`.trim(),

  "brown-forsythe": `
if (!requireNamespace("car", quietly = TRUE)) install.packages("car")
library(car)

df <- data.frame(
  y = c(rnorm(20, 0, 1), rnorm(20, 0, 2), rnorm(20, 0, 1.5)),
  group = factor(rep(c("g1","g2","g3"), each = 20))
)
leveneTest(y ~ group, data = df, center = median)
`.trim(),

  "fligner-killeen": `
df <- data.frame(
  y = c(rnorm(20, 0, 1), rnorm(20, 0, 2), rnorm(20, 0, 1.5)),
  group = factor(rep(c("g1","g2","g3"), each = 20))
)
fligner.test(y ~ group, data = df)
`.trim(),

  "hartley-fmax": `
g1 <- rnorm(20, sd = 1)
g2 <- rnorm(20, sd = 2)
g3 <- rnorm(20, sd = 1.5)
fmax <- max(var(g1), var(g2), var(g3)) / min(var(g1), var(g2), var(g3))
`.trim(),

  "shapiro-wilk": `
x <- rnorm(30)
shapiro.test(x)
`.trim(),

  "kolmogorov-smirnov": `
x <- rnorm(50)
ks.test(x, "pnorm", mean(x), sd(x))
`.trim(),

  "anderson-darling": `
if (!requireNamespace("nortest", quietly = TRUE)) install.packages("nortest")
library(nortest)

x <- rnorm(50)
ad.test(x)
`.trim(),

  "dagostino-pearson": `
if (!requireNamespace("fBasics", quietly = TRUE)) install.packages("fBasics")
library(fBasics)

x <- rnorm(80)
dagoTest(x)
`.trim(),

  "levene-test": `
if (!requireNamespace("car", quietly = TRUE)) install.packages("car")
library(car)

df <- data.frame(
  y = c(rnorm(20, 0, 1), rnorm(20, 0, 2), rnorm(20, 0, 1.5)),
  group = factor(rep(c("g1","g2","g3"), each = 20))
)
leveneTest(y ~ group, data = df, center = mean)
`.trim(),

  "durbin-watson": `
if (!requireNamespace("lmtest", quietly = TRUE)) install.packages("lmtest")
library(lmtest)

df <- data.frame(y = rnorm(50), x = 1:50)
fit <- lm(y ~ x, data = df)
dwtest(fit)
`.trim(),

  "breusch-pagan": `
if (!requireNamespace("lmtest", quietly = TRUE)) install.packages("lmtest")
library(lmtest)

df <- data.frame(y = rnorm(60), x1 = rnorm(60), x2 = rnorm(60))
fit <- lm(y ~ x1 + x2, data = df)
bptest(fit)
`.trim(),

  "vif": `
if (!requireNamespace("car", quietly = TRUE)) install.packages("car")
library(car)

df <- data.frame(y = rnorm(100), x1 = rnorm(100), x2 = rnorm(100), x3 = rnorm(100))
fit <- lm(y ~ x1 + x2 + x3, data = df)
vif(fit)
`.trim(),

  "tukey-hsd": `
df <- data.frame(
  y = c(5,6,5,7,  8,9,7,10,  6,5,7,6),
  group = factor(rep(c("g1","g2","g3"), each = 4))
)
fit <- aov(y ~ group, data = df)
TukeyHSD(fit)
`.trim(),

  "dunnett-test": `
if (!requireNamespace("multcomp", quietly = TRUE)) install.packages("multcomp")
library(multcomp)

df <- data.frame(
  y = c(rnorm(20, 0), rnorm(20, 0.4), rnorm(20, 0.8)),
  group = factor(rep(c("ctrl","trt1","trt2"), each = 20))
)
fit <- aov(y ~ group, data = df)
summary(glht(fit, linfct = mcp(group = "Dunnett")))
`.trim(),

  "games-howell": `
if (!requireNamespace("rstatix", quietly = TRUE)) install.packages("rstatix")
library(rstatix)

df <- data.frame(
  y = c(rnorm(18, 0, 1), rnorm(22, 0.5, 2), rnorm(20, 1.0, 1.5)),
  group = factor(rep(c("g1","g2","g3"), times = c(18,22,20)))
)
games_howell_test(df, y ~ group)
`.trim(),

  "scheffe-test": `
if (!requireNamespace("agricolae", quietly = TRUE)) install.packages("agricolae")
library(agricolae)

df <- data.frame(
  y = c(5,6,5,7,  8,9,7,10,  6,5,7,6),
  group = factor(rep(c("g1","g2","g3"), each = 4))
)

fit <- aov(y ~ group, data = df)

an <- anova(fit)
DFerror <- an["Residuals", "Df"]
MSerror <- an["Residuals", "Mean Sq"]
Fc <- qf(0.95, an["group","Df"], DFerror)  # 95% critical F

res <- scheffe.test(y = df$y, trt = df$group, DFerror = DFerror, MSerror = MSerror, Fc = Fc)
`.trim(),

  "dunn-test": `
if (!requireNamespace("FSA", quietly = TRUE)) install.packages("FSA")
library(FSA)

df <- data.frame(
  y = c(5,6,5,7,  8,9,7,10,  6,5,7,6),
  group = factor(rep(c("g1","g2","g3"), each = 4))
)
dunnTest(y ~ group, data = df, method = "bh")
`.trim(),

  "bonferroni": `
pvals <- c(0.01, 0.04, 0.20, 0.003, 0.07)
p.adjust(pvals, method = "bonferroni")
`.trim(),

  "holm-bonferroni": `
pvals <- c(0.01, 0.04, 0.20, 0.003, 0.07)
p.adjust(pvals, method = "holm")
`.trim(),

  "benjamini-hochberg": `
pvals <- c(0.01, 0.04, 0.20, 0.003, 0.07)
p.adjust(pvals, method = "BH")
`.trim(),

  "welch-t-test": `
g1 <- c(5, 6, 5, 7, 6)
g2 <- c(8, 9, 7, 10, 9)
t.test(g1, g2, var.equal = FALSE)
`.trim(),

  "welch-anova": `
if (!requireNamespace("onewaytests", quietly = TRUE)) install.packages("onewaytests")
library(onewaytests)

df <- data.frame(
  y = c(rnorm(20, 0, 1), rnorm(20, 0.5, 2), rnorm(20, 1, 1.5)),
  group = factor(rep(c("g1","g2","g3"), each = 20))
)
welch.test(y ~ group, data = df)
`.trim(),

  "ancova": `
df <- data.frame(
  y = rnorm(60),
  group = factor(rep(c("A","B"), each = 30)),
  covar = rnorm(60)
)
fit <- lm(y ~ group + covar, data = df)
anova(fit)
`.trim(),

  "manova": `
df <- data.frame(
  y1 = c(5,6,5,  8,9,7),
  y2 = c(2,3,2,  5,6,5),
  group = factor(c("A","A","A","B","B","B"))
)
fit <- manova(cbind(y1, y2) ~ group, data = df)
summary(fit, test = "Wilks")
`.trim(),

  "kendall-tau": `
x <- c(1,2,3,4,5,6,7,8)
y <- c(2,1,4,3,5,7,6,8)
cor.test(x, y, method = "kendall")
`.trim(),

  "point-biserial": `
if (!requireNamespace("ltm", quietly = TRUE)) install.packages("ltm")
library(ltm)

y_bin <- c(0,1,0,1,1,0,1,0,1,0)
x_cont <- c(2.1,1.8,2.4,2.9,3.0,1.9,2.7,2.0,2.8,2.2)
biserial.cor(x_cont, y_bin)
`.trim(),

  "cochran-q": `
if (!requireNamespace("DescTools", quietly = TRUE)) install.packages("DescTools")
library(DescTools)

m <- matrix(c(
  1,0,1,
  1,1,1,
  0,0,1,
  1,0,0,
  0,1,1,
  1,1,0
), ncol = 3, byrow = TRUE)
CochranQTest(m)
`.trim(),

  "negative-binomial": `
if (!requireNamespace("MASS", quietly = TRUE)) install.packages("MASS")
library(MASS)

df <- data.frame(
  y = c(0,1,2,3,1,2,4,3,0,2),
  x = c(1,2,1,2,1,2,1,2,2,1)
)
fit <- glm.nb(y ~ x, data = df)
summary(fit)
`.trim(),

  "zero-inflated-poisson": `
if (!requireNamespace("pscl", quietly = TRUE)) install.packages("pscl")
library(pscl)

df <- data.frame(
  y = c(0,0,0,1,0,2,0,3,0,1),
  x = c(1,2,1,2,1,2,1,2,1,2)
)
fit <- zeroinfl(y ~ x | x, data = df, dist = "poisson")
summary(fit)
`.trim(),

  "quantile-regression": `
if (!requireNamespace("quantreg", quietly = TRUE)) install.packages("quantreg")
library(quantreg)

df <- data.frame(y = rnorm(200), x = rnorm(200))
fit <- rq(y ~ x, data = df, tau = 0.5)
summary(fit)
`.trim(),

  "robust-regression": `
if (!requireNamespace("MASS", quietly = TRUE)) install.packages("MASS")
library(MASS)

df <- data.frame(y = c(rnorm(80), 20, 22), x = c(rnorm(80), 3, 3))
fit <- rlm(y ~ x, data = df)
summary(fit)
`.trim(),

  "probit-regression": `
df <- data.frame(
  y = c(0,0,0,1,0,1,1,1),
  x = c(1,2,1,2,1,2,1,2)
)
fit <- glm(y ~ x, data = df, family = binomial(link = "probit"))
summary(fit)
`.trim(),

  "svm": `
if (!requireNamespace("e1071", quietly = TRUE)) install.packages("e1071")
library(e1071)


df <- data.frame(
  y = factor(sample(c("A","B"), 200, replace = TRUE)),
  x1 = rnorm(200),
  x2 = rnorm(200)
)
fit <- svm(y ~ ., data = df, kernel = "radial")
`.trim(),

  "xgboost": `
if (!requireNamespace("xgboost", quietly = TRUE)) install.packages("xgboost")
library(xgboost)


X <- matrix(rnorm(500 * 5), ncol = 5)
y <- rbinom(500, 1, 0.5)

dtrain <- xgb.DMatrix(X, label = y)

fit <- xgb.train(
  params = list(objective = "binary:logistic", eval_metric = "logloss"),
  data = dtrain,
  nrounds = 50,
  verbose = 0
)

p <- predict(fit, dtrain)
pred <- ifelse(p > 0.5, 1, 0)

mean(pred == y)   # accuracy
head(p)           # predicted probabilities
imp <- xgb.importance(model = fit)
imp; xgb.plot.importance(imp)
`.trim(),

  "lightgbm": `
if (!requireNamespace("lightgbm", quietly = TRUE)) install.packages("lightgbm")
library(lightgbm)


X <- matrix(rnorm(300 * 6), ncol = 6)
y <- rnorm(300)

dtrain <- lgb.Dataset(data = X, label = y)

fit <- lgb.train(
  params = list(objective = "regression", metric = "l2"),
  data = dtrain,
  nrounds = 50,
  verbose = -1
)

pred <- predict(fit, X)
head(pred)          # predicted probabilities
mean((pred - y)^2)  # MSE
`.trim(),

  "catboost": `
if (!requireNamespace("catboost", quietly = TRUE)) {
  if (!requireNamespace("remotes", quietly = TRUE)) install.packages("remotes")

  remotes::install_url(
    "https://github.com/catboost/catboost/releases/download/v1.2.10/catboost-R-darwin-universal2-1.2.10.tgz",
    upgrade = "never",
    INSTALL_opts = c("--no-multiarch", "--no-test-load", "--no-staged-install")
  )
}

library(catboost)


df <- data.frame(
  y = rnorm(200),
  x1 = rnorm(200),
  x2 = rnorm(200),
  x3 = rnorm(200)
)
pool <- catboost.load_pool(data = df[, c("x1","x2","x3")], label = df$y)
fit <- catboost.train(pool, NULL, params = list(loss_function = "RMSE", iterations = 100, verbose = 0))
pred <- catboost.predict(fit, pool)
rmse <- sqrt(mean((pred - df$y)^2))
imp <- catboost.get_feature_importance(fit, pool)
head(pred); rmse; imp
`.trim(),

  "knn": `
if (!requireNamespace("class", quietly = TRUE)) install.packages("class")
library(class)


X <- matrix(rnorm(300 * 2), ncol = 2)
y <- factor(sample(c("A","B"), 300, replace = TRUE))

idx <- sample(1:300, 200)
pred <- knn(train = X[idx, ], test = X[-idx, ], cl = y[idx], k = 5)
table(pred, y[-idx])
`.trim(),

  "naive-bayes": `
if (!requireNamespace("e1071", quietly = TRUE)) install.packages("e1071")
library(e1071)


df <- data.frame(
  y = factor(sample(c("A","B"), 200, replace = TRUE)),
  x1 = rnorm(200),
  x2 = rnorm(200)
)
fit <- naiveBayes(y ~ ., data = df)
`.trim(),

  "decision-tree": `
if (!requireNamespace("rpart", quietly = TRUE)) install.packages("rpart")
library(rpart)


df <- data.frame(
  y = factor(sample(c("A","B"), 200, replace = TRUE)),
  x1 = rnorm(200),
  x2 = rnorm(200)
)
fit <- rpart(y ~ ., data = df, method = "class")
pred_class <- predict(fit, df, type = "class")
pred_prob  <- predict(fit, df, type = "prob")

head(pred_class)
head(pred_prob)

mean(pred_class == df$y)
table(truth = df$y, pred = pred_class)

plot(fit); text(fit, cex = 0.8)
fit$variable.importance
`.trim(),

  "elastic-net": `
if (!requireNamespace("glmnet", quietly = TRUE)) install.packages("glmnet")
library(glmnet)


X <- matrix(rnorm(200 * 10), ncol = 10)
y <- rnorm(200)

fit <- cv.glmnet(X, y, alpha = 0.5)
coef(fit, s = "lambda.min")
`.trim(),

  "neural-network-mlp": `
if (!requireNamespace("nnet", quietly = TRUE)) install.packages("nnet")
library(nnet)


df <- data.frame(
  y = factor(sample(c("A","B"), 300, replace = TRUE)),
  x1 = rnorm(300),
  x2 = rnorm(300)
)
fit <- nnet(y ~ x1 + x2, data = df, size = 5, maxit = 200, trace = FALSE)
`.trim(),

  "dbscan": `
if (!requireNamespace("dbscan", quietly = TRUE)) install.packages("dbscan")
library(dbscan)


X <- matrix(rnorm(400), ncol = 2)
fit <- dbscan(X, eps = 0.3, minPts = 5)
table(fit$cluster)
`.trim(),

  "gaussian-mixture": `
if (!requireNamespace("mclust", quietly = TRUE)) install.packages("mclust")
library(mclust)


X <- matrix(rnorm(400), ncol = 2)
fit <- Mclust(X, G = 1:4)
summary(fit)
`.trim(),

  "tsne": `
if (!requireNamespace("Rtsne", quietly = TRUE)) install.packages("Rtsne")
library(Rtsne)


X <- scale(matrix(rnorm(500), ncol = 5))
fit <- Rtsne(X, dims = 2, perplexity = 10, verbose = FALSE)
head(fit$Y)
`.trim(),

  "umap": `
if (!requireNamespace("umap", quietly = TRUE)) install.packages("umap")
library(umap)


X <- scale(matrix(rnorm(500), ncol = 5))
fit <- umap(X)
head(fit$layout)
`.trim(),

  "prophet": `
if (!requireNamespace("prophet", quietly = TRUE)) install.packages("prophet")
library(prophet)

df <- data.frame(
  ds = seq.Date(as.Date("2020-01-01"), by = "month", length.out = 36),
  y = 10 + cumsum(rnorm(36))
)

m <- prophet(df, yearly.seasonality=TRUE, weekly.seasonality=FALSE, daily.seasonality=FALSE)
future <- make_future_dataframe(m, periods=12, freq="month")
forecast <- predict(m, future)
tail(forecast[, c("ds","yhat","yhat_lower","yhat_upper")])
`.trim(),

  "adf-test": `
if (!requireNamespace("tseries", quietly = TRUE)) install.packages("tseries")
library(tseries)


x <- ts(cumsum(rnorm(200)))
adf.test(x)
`.trim(),

  "granger-causality": `
if (!requireNamespace("lmtest", quietly = TRUE)) install.packages("lmtest")
library(lmtest)


n <- 200
x <- rnorm(n)
y <- stats::filter(x, filter = 0.6, method = "recursive") + rnorm(n)

df <- data.frame(y = as.numeric(y), x = x)
grangertest(y ~ x, order = 2, data = df)
`.trim(),

  "ljung-box": `
x <- ts(rnorm(200))
Box.test(x, lag = 12, type = "Ljung-Box")
`.trim(),

  "var": `
if (!requireNamespace("vars", quietly = TRUE)) install.packages("vars")
library(vars)


df <- data.frame(
  y1 = cumsum(rnorm(120)),
  y2 = cumsum(rnorm(120))
)
fit <- VAR(df, p = 2, type = "const")
summary(fit)
`.trim(),

  "bayesian-t-test": `
if (!requireNamespace("BayesFactor", quietly = TRUE)) install.packages("BayesFactor")
library(BayesFactor)


x <- rnorm(20, mean = 0)
y <- rnorm(20, mean = 0.5)
ttestBF(x = x, y = y)
`.trim(),

  "bayesian-regression": `
if (!requireNamespace("brms", quietly = TRUE)) install.packages("brms")
library(brms)


df <- data.frame(y = rnorm(80), x = rnorm(80))
fit <- brm(y ~ x, data = df, family = gaussian(), chains = 2, iter = 1000, refresh = 0)
summary(fit)
`.trim(),

  "bayesian-anova": `
if (!requireNamespace("BayesFactor", quietly = TRUE)) install.packages("BayesFactor")
library(BayesFactor)


df <- data.frame(
  y = rnorm(60),
  group = factor(rep(c("g1","g2","g3"), each = 20))
)
anovaBF(y ~ group, data = df)
`.trim(),

  "accelerated-failure-time": `
if (!requireNamespace("survival", quietly = TRUE)) install.packages("survival")
library(survival)

df <- data.frame(
  time = c(5,8,12,3,9,10,4,7, 6,11,2,13),
  status = c(1,1,0,1,0,1,1,0, 1,0,1,0),
  x = rnorm(12)
)

fit <- survreg(Surv(time, status) ~ x, data = df, dist = "weibull")
summary(fit)
`.trim(),

  "competing-risks": `
if (!requireNamespace("cmprsk", quietly = TRUE)) install.packages("cmprsk")
library(cmprsk)

df <- data.frame(
  time = c(5,8,12,3,9,10,4,7, 6,11,2,13),
  status = c(1,2,0,1,2,1,1,0, 2,0,1,2),  # 0=censored, 1=cause1, 2=cause2
  group = factor(rep(c("A","B"), each = 6))
)
fit <- cuminc(ftime = df$time, fstatus = df$status, group = df$group)
`.trim(),

  "random-survival-forest": `
if (!requireNamespace("randomForestSRC", quietly = TRUE)) install.packages("randomForestSRC")
library(randomForestSRC)


df <- data.frame(
  time = rexp(200),
  status = rbinom(200, 1, 0.7),
  x1 = rnorm(200),
  x2 = rnorm(200)
)

fit <- rfsrc(Surv(time, status) ~ x1 + x2, data = df, ntree = 300)
`.trim(),

  "cohens-d": `
if (!requireNamespace("effsize", quietly = TRUE)) install.packages("effsize")
library(effsize)

g1 <- c(5, 6, 5, 7, 6)
g2 <- c(8, 9, 7, 10, 9)
cohen.d(g2, g1, pooled = TRUE)
`.trim(),

  "hedges-g": `
if (!requireNamespace("effsize", quietly = TRUE)) install.packages("effsize")
library(effsize)

g1 <- c(5, 6, 5, 7, 6)
g2 <- c(8, 9, 7, 10, 9)
# Hedges' g = Cohen's d with small-sample correction
cohen.d(g2, g1, pooled = TRUE, hedges.correction = TRUE)
`.trim(),

  "eta-squared": `
if (!requireNamespace("effectsize", quietly = TRUE)) install.packages("effectsize")
library(effectsize)

df <- data.frame(
  y = c(rnorm(20,0), rnorm(20,0.5), rnorm(20,1)),
  group = factor(rep(c("g1","g2","g3"), each = 20))
)
fit <- aov(y ~ group, data = df)
eta_squared(fit, partial = FALSE)
eta_squared(fit, partial = TRUE)
`.trim(),

  "odds-ratio": `
tab <- matrix(c(30, 20,
                10, 40), nrow = 2, byrow = TRUE)
or <- (tab[1,1] * tab[2,2]) / (tab[1,2] * tab[2,1])
`.trim(),

  "cramers-v": `
if (!requireNamespace("DescTools", quietly = TRUE)) install.packages("DescTools")
library(DescTools)

tab <- matrix(c(10,20,30,
                15,25,35), nrow = 2, byrow = TRUE)
CramerV(tab)
`.trim(),

  "omega-squared": `
if (!requireNamespace("effectsize", quietly = TRUE)) install.packages("effectsize")
library(effectsize)

df <- data.frame(
  y = c(rnorm(20,0), rnorm(20,0.5), rnorm(20,1)),
  group = factor(rep(c("g1","g2","g3"), each = 20))
)
fit <- aov(y ~ group, data = df)
omega_squared(fit)
`.trim(),

  "epsilon-squared": `
if (!requireNamespace("rcompanion", quietly = TRUE)) install.packages("rcompanion")
library(rcompanion)


df <- data.frame(
  y = c(rnorm(20,0), rnorm(20,0.5), rnorm(20,1)),
  group = factor(rep(c("g1","g2","g3"), each = 20))
)

epsilonSquared(x = df$y, g = df$group, ci = TRUE, conf=0.95, R=1000)  # 95% CI
`.trim(),

  "rank-biserial": `
if (!requireNamespace("effectsize", quietly = TRUE)) install.packages("effectsize")
library(effectsize)

g1 <- c(5,6,5,7,6)
g2 <- c(8,9,7,10,9)

rank_biserial(g2, g1)
# or (if you already ran a Wilcoxon/Mann-Whitney test):
# rank_biserial(wilcox.test(g2, g1))
`.trim(),

  "phi-coefficient": `
tab <- matrix(c(12, 5,
                3, 10), nrow = 2, byrow = TRUE)
phi <- (tab[1,1]*tab[2,2] - tab[1,2]*tab[2,1]) /
  sqrt(sum(tab[1,]) * sum(tab[2,]) * sum(tab[,1]) * sum(tab[,2]))
phi
`.trim(),

  "risk-ratio": `
a <- 30; b <- 20; c <- 10; d <- 40  # 2x2: [a b; c d]
rr <- (a / (a + b)) / (c / (c + d))
`.trim(),

  "risk-difference": `
a <- 30; b <- 20; c <- 10; d <- 40
rd <- (a / (a + b)) - (c / (c + d))
`.trim(),

  "cohens-kappa": `
if (!requireNamespace("irr", quietly = TRUE)) install.packages("irr")
library(irr)

ratings <- data.frame(
  r1 = c(1,1,2,2,3,3,2,1),
  r2 = c(1,2,2,2,3,3,1,1)
)
kappa2(ratings, weight = "unweighted")
`.trim(),

  "fleiss-kappa": `
if (!requireNamespace("irr", quietly = TRUE)) install.packages("irr")
library(irr)

m <- matrix(c(
  1,1,0,
  0,2,0,
  0,1,1,
  1,0,1,
  0,0,2
), nrow = 5, byrow = TRUE)
kappam.fleiss(m)
`.trim(),

  "intraclass-correlation": `
if (!requireNamespace("irr", quietly = TRUE)) install.packages("irr")
library(irr)

ratings <- data.frame(
  r1 = c(10,12,9,11,13,10),
  r2 = c(11,11,10,12,14,9),
  r3 = c(10,13,9,11,15,10)
)
icc(ratings, model = "twoway", type = "agreement", unit = "average")
`.trim()
};
