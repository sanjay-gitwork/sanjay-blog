Pie charts in Matplotlib are a go-to for visualizing "parts of a whole." While they get a lot of heat from data purists for being hard to read with too many slices, they are incredibly effective when kept simple.

In Matplotlib, the `plt.pie()` function is the engine behind these charts. Let’s break down how to move beyond a basic circle and create something professional.fffggfc

---

## 1. The Core Syntax

At its simplest, you only need an array of values. Matplotlib handles the math to convert those values into percentages of $360^\circ$.

Python

```python
import matplotlib.pyplot as plt

data = [25, 35, 20, 20]
plt.pie(data)
plt.show()
```

---

## 2. Key Parameters for Customization

To make a pie chart actually useful, you need to use the parameters that control its appearance and readability.

- **`labels`**: Assigns names to each wedge.
    
- **`autopct`**: This is a string or function used to label the wedges with their numeric value. Using `'%1.1f%%'` will display percentages with one decimal point.
    
- **`explode`**: This allows you to "pop out" a specific slice. It’s an array of offsets (e.g., `0.1` moves a slice out, `0` keeps it in place).
    
- **`shadow`**: Set to `True` to give the chart a 3D-like depth.
    
- **`startangle`**: Rotates the start of the chart. Often set to `90` or `140` to make the first slice look more balanced.
    
- **`colors`**: You can pass a list of hex codes or Matplotlib color names to match your branding.
    

---

## 3. Practical Example

Here is a comprehensive snippet that combines these features into a clean visualization.

Python

```python
import matplotlib.pyplot as plt

# Data
labels = ['Python', 'Java', 'C++', 'JavaScript']
sizes = [45, 25, 15, 15]
colors = ['#ff9999','#66b3ff','#99ff99','#ffcc99']
explode = (0.1, 0, 0, 0)  # "explode" the first slice (Python)

# Create the plot
fig, ax = plt.subplots(figsize=(7, 7))
ax.pie(sizes, 
       explode=explode, 
       labels=labels, 
       colors=colors, 
       autopct='%1.1f%%', 
       shadow=True, 
       startangle=140)

# Equal aspect ratio ensures that pie is drawn as a circle.
ax.axis('equal')  

plt.title("Programming Language Usage")
plt.show()
```

---

## 4. Pro-Tips for Better Pie Charts

- **The "Rule of 5":** If you have more than five categories, a pie chart usually becomes messy. Consider a **Bar Chart** instead.
    
- **Donut Charts:** You can turn a pie chart into a donut chart by drawing a white circle in the center. This is often seen as more "modern."
    
- **Sorting:** For better readability, sort your data from largest to smallest. It makes it much easier for the human eye to compare the relative sizes of the slices.
    

---

## 5. Advanced: Wedge Properties

If you want to get fancy, the `wedgeprops` parameter allows you to edit the edges of the slices. For example, `wedgeprops={'edgecolor': 'black', 'linewidth': 2}` will add a thick border between your slices, which can help them "pop" against a dark background.

> **Note:** Always remember to call `plt.axis('equal')`. Without it, Matplotlib might render your pie as an oval if the figure window isn't a perfect square!

Would you like me to show you how to convert this pie chart into a **Donut Chart** with a center label?



Sanjay, since you’re learning data visualization seriously (Tableau + custom visualization library + Python), I’ll explain **pie charts in Matplotlib** from **concept → syntax → real-world usage → mistakes → best practices** so you actually understand _when and how_ to use them—not just how to draw one.

---

## 1️⃣ What is a Pie Chart (Concept First)

A **pie chart** represents **parts of a whole (100%)**.

- Each **slice** = proportion of a category
    
- Total of all values = **100%**
    
- Angle of slice = `(value / total) × 360°`
    

👉 Best when:

- Categories are **few (≤ 5)**
    
- Differences are **clearly visible**
    
- You want **percentage contribution**
    

🚫 Avoid when:

- Too many categories
    
- Values are very close
    
- Need precise comparison (bar chart is better)
    

---

## 2️⃣ Basic Pie Chart in Matplotlib

```python
import matplotlib.pyplot as plt

labels = ['Python', 'Java', 'C++', 'JavaScript']
sizes = [45, 25, 15, 15]

plt.pie(sizes, labels=labels)
plt.title("Programming Language Usage")
plt.show()
```

### What happens internally?

- `sizes` → determines slice angles
    
- `labels` → category names
    
- Matplotlib automatically normalizes values to 100%
    

---

## 3️⃣ Adding Percentages (`autopct`)

```python
plt.pie(
    sizes,
    labels=labels,
    autopct='%1.1f%%'
)
```

### autopct options:

|Format|Meaning|
|---|---|
|`%1.0f%%`|45%|
|`%1.1f%%`|45.3%|
|`%1.2f%%`|45.34%|

💡 **Interview Tip:**  
Matplotlib calculates percentages internally, you don’t need to.

---

## 4️⃣ Start Angle (Rotation Control)

```python
plt.pie(
    sizes,
    labels=labels,
    startangle=90
)
```

- `startangle=90` → starts from top (12 o’clock)
    
- Makes charts look **professional & consistent**
    

---

## 5️⃣ Exploding a Slice (Highlighting Important Data)

```python
explode = [0.1, 0, 0, 0]

plt.pie(
    sizes,
    labels=labels,
    explode=explode,
    autopct='%1.1f%%'
)
```

📌 Use explode to:

- Highlight max value
    
- Show key insight
    

🚫 Don’t explode multiple slices (looks messy)

---

## 6️⃣ Colors Customization

```python
colors = ['gold', 'skyblue', 'lightgreen', 'pink']

plt.pie(
    sizes,
    labels=labels,
    colors=colors,
    autopct='%1.1f%%'
)
```

👉 In real dashboards:

- Use **brand colors**
    
- Keep contrast high
    

---

## 7️⃣ Donut Chart (Advanced but Common)

Pie chart with a hole in center 👇

```python
plt.pie(
    sizes,
    labels=labels,
    autopct='%1.1f%%',
    wedgeprops={'width': 0.4}
)
```

✅ Better readability  
✅ More modern  
✅ Common in dashboards (Power BI / Tableau)

---

## 8️⃣ Equal Aspect Ratio (VERY IMPORTANT)

```python
plt.axis('equal')
```

Without this:  
❌ Pie becomes oval  
✅ Always add it

---

## 9️⃣ Full Professional Example

```python
import matplotlib.pyplot as plt

labels = ['Python', 'Java', 'C++', 'JavaScript']
sizes = [45, 25, 15, 15]
explode = [0.1, 0, 0, 0]

plt.figure(figsize=(6,6))
plt.pie(
    sizes,
    labels=labels,
    explode=explode,
    autopct='%1.1f%%',
    startangle=90
)
plt.title("Programming Language Popularity")
plt.axis('equal')
plt.show()
```

---

## 🔟 Common Mistakes (Interview + Real World)

❌ Too many slices  
❌ Using pie chart for trend data  
❌ No percentage labels  
❌ Not using `axis('equal')`  
❌ Comparing close values (use bar chart instead)

---

## 1️⃣1️⃣ Pie Chart vs Bar Chart (Important for Interviews)

|Use Case|Chart|
|---|---|
|Percentage contribution|Pie|
|Exact comparison|Bar|
|Trend over time|Line|
|Many categories|Bar|

---

## 1️⃣2️⃣ Real-World Use Cases

- Market share
    
- Budget allocation
    
- Survey results
    
- Resource distribution
    
- Tech stack usage
    


Just tell me 👍