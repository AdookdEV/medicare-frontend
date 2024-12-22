import React, { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Grid, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";

const articles = [
    {
        title: "Patient Health and Medications",
        description: "Learn how medications affect patient health and the importance of responsible use.",
        image: "/assets/imagesForArticle/patient.png",
        content: `
      <h3>The Role of Medications in Patient Health</h3>
      Medications play a crucial role in managing various health conditions, ranging from chronic diseases to acute illnesses. They can help alleviate symptoms, prevent disease progression, and even save lives. However, it's essential to understand the various types of medications and their potential effects on patient health to ensure proper usage.

      There are many categories of medications, including antibiotics, antivirals, pain relievers, anti-inflammatory drugs, and chronic disease management drugs (like those for diabetes and hypertension). Each category serves a specific purpose, but they must be taken correctly to achieve the desired outcomes.

      <h3>How Medications Affect the Body</h3>
      Medications interact with the body in different ways. They can either target a specific issue, such as reducing inflammation or fighting infection, or they can work systemically, affecting the entire body. For example, pain relievers (like ibuprofen) target inflammation or pain directly at the site of injury or illness, while other medications, such as those for hypertension, work by regulating blood pressure to prevent complications like heart attacks or strokes.

      It’s important to remember that all medications have potential side effects. These side effects vary depending on the medication and the patient’s individual health condition. Some side effects are mild, like headaches or nausea, while others can be more severe, such as allergic reactions or organ damage. That’s why it’s critical for patients to communicate openly with healthcare providers about any unusual symptoms they experience while taking medication.

      <h3>Safe Medication Practices</h3>
      Responsible medication use is essential for ensuring patient safety and effectiveness. Here are some key practices to follow:

      <ul>
        <li><strong>Follow Prescriptions Exactly:</strong> Always take medications as prescribed by your doctor. Do not adjust dosages or skip doses without consulting your healthcare provider.</li>
        <li><strong>Avoid Self-Medicating:</strong> Self-medication, especially with over-the-counter drugs, can be dangerous. Always seek professional advice before starting or changing a medication regimen.</li>
        <li><strong>Understand Side Effects:</strong> Ask your healthcare provider about the potential side effects of your medication. Being aware of them will help you identify any problems early and seek help when necessary.</li>
        <li><strong>Keep Track of Your Medications:</strong> Maintain a list of all medications you are taking, including prescriptions, over-the-counter drugs, and supplements. This helps prevent dangerous interactions between drugs and ensures that your healthcare providers are aware of everything you're using.</li>
        <li><strong>Store Medications Properly:</strong> Store medications according to the instructions on the label. Some medications need to be kept in a cool, dry place, while others may require refrigeration.</li>
      </ul>

      <h3>Patient Health: The Importance of Communication</h3>
      Open communication between patients and healthcare providers is vital in managing medications effectively. Patients should feel comfortable discussing their symptoms, lifestyle factors, and concerns with their doctors to ensure the prescribed medications are appropriate for their needs.

      Additionally, patients should report any side effects or new symptoms as soon as they appear. For instance, if a patient experiences dizziness or fatigue after starting a new medication, it may indicate a need for dosage adjustments or a change in medication.

      <h3>The Risks of Inappropriate Medication Use</h3>
      Inappropriate or incorrect medication use can lead to several risks, including:

      <ul>
        <li><strong>Drug Interactions:</strong> Some medications can interact with others, leading to dangerous side effects or reduced effectiveness.</li>
        <li><strong>Medication Resistance:</strong> Taking antibiotics improperly (such as not completing the full course) can contribute to antibiotic resistance, making infections harder to treat.</li>
        <li><strong>Overdose or Underdose:</strong> Taking too much or too little of a medication can have serious consequences, from toxicity to inadequate symptom management.</li>
        <li><strong>Chronic Health Problems:</strong> For chronic conditions, improper medication management can result in worsened symptoms or complications, such as uncontrolled blood sugar levels in diabetes or unregulated blood pressure in hypertension.</li>
      </ul>

      <h3>Patient Education and Empowerment</h3>
      Educating patients about their health conditions and medications is a cornerstone of effective treatment. Patients who are well-informed about their medications are more likely to adhere to treatment regimens, monitor for side effects, and communicate effectively with healthcare providers.

      Here are a few ways to empower patients:

      <ul>
        <li><strong>Provide Clear Instructions:</strong> Ensure that patients understand how and when to take their medications. Written instructions and verbal explanations are key to patient understanding.</li>
        <li><strong>Encourage Questions:</strong> Patients should feel comfortable asking questions about their treatment, including concerns about side effects or interactions with other medications.</li>
        <li><strong>Offer Support:</strong> Support from family, friends, and healthcare providers can help patients adhere to their medication regimen and improve treatment outcomes.</li>
      </ul>

      <h3>Conclusion: Medication is Key to Managing Health</h3>
      Medications are essential tools in managing patient health, particularly for those with chronic conditions or acute illnesses. However, they must be used correctly to ensure safety and effectiveness. Responsible medication practices, open communication with healthcare providers, and proper patient education are crucial for achieving optimal health outcomes.

      By following these guidelines, patients can safely and effectively use medications as part of their overall healthcare plan, improving their quality of life and reducing the risks associated with poor medication management.
    `
    },
    {
        title: "The Importance of Staying Hydrated",
        description: "Learn why hydration is essential for your health and how much water you should drink daily.",
        image: "/assets/imagesForArticle/water.png",
        content: `
          <h3>Why Hydration Matters</h3>
          Water plays an essential role in almost every bodily function. It helps regulate your body temperature, keep your joints lubricated, deliver nutrients to your cells, and keep your organs functioning properly. Dehydration, even at a minor level, can lead to fatigue, dizziness, and headaches. Prolonged dehydration may result in more severe conditions like kidney stones, urinary tract infections, and even heatstroke. Staying hydrated also helps your skin stay healthy, keeping it plump and reducing the appearance of wrinkles.

          <h3>Daily Water Needs</h3>
          While the "8 glasses a day" rule is a good starting point, individual needs vary. Factors like age, activity level, and climate can all impact how much water you need. For example, someone who exercises regularly or lives in a hot climate may need more water to stay hydrated. Athletes or people who work in hot environments might need even more fluids. It's also important to remember that not all of your fluid intake needs to come from water — other beverages and foods with high water content, such as fruits and vegetables, contribute to your overall hydration.

          <h3>How to Incorporate More Water</h3>
          - Start your day with a large glass of water.  
          - Carry a reusable water bottle to encourage regular sips.  
          - Incorporate water-rich foods into your diet, such as cucumbers, watermelon, and oranges.  
          - Set reminders on your phone to drink water throughout the day.
          - Drink a glass of water before meals to promote fullness and aid digestion.
          
          <h3>Effects of Dehydration</h3>
          Mild dehydration can have a noticeable impact on your body. It can lead to dry mouth, tiredness, and dizziness. As dehydration becomes more severe, it can lead to a significant reduction in mental clarity, muscle function, and overall energy levels. Chronic dehydration can lead to kidney stones, urinary tract infections, and even heatstroke during hot weather. If you experience chronic dehydration, it may be a sign that you are not consuming enough fluids throughout the day.

          <h3>Hydration Tips for Different Lifestyles</h3>
          - **For athletes**: Drink water before, during, and after exercise. Consider adding electrolytes to your water if you are engaging in intense or prolonged physical activity.
          - **For office workers**: Keep a water bottle at your desk and sip throughout the day to stay hydrated without getting up.
          - **For parents**: Set a good example for your children by drinking water regularly and encouraging them to do the same.

          Staying hydrated is one of the simplest ways to improve your overall health and energy levels. Make it a habit, and your body will thank you.
        `,
    },
    {
        title: "10 Tips for Better Sleep",
        description: "Struggling to sleep? Check out these tips for achieving better quality sleep.",
        image: "/assets/imagesForArticle/sleep.png",
        content: `
          <h3>The Science of Sleep</h3>
          Sleep is a critical component of health, yet millions of people struggle with it daily. Quality sleep improves your mood, sharpens your memory, and strengthens your immune system. Poor sleep, on the other hand, can lead to chronic illnesses such as heart disease and diabetes. Sleep is regulated by the body’s internal clock, known as the circadian rhythm. This clock helps dictate your sleep-wake cycle and is influenced by environmental factors such as light and temperature.

          <h3>Practical Tips for Better Rest</h3>
          <ul>
            <li><strong>Stick to a schedule:</strong> Maintaining a consistent sleep routine helps regulate your body's internal clock. Aim to wake up and go to bed at the same time each day, even on weekends.</li>
            <li><strong>Limit screen time:</strong> Avoid screens at least one hour before bed as blue light interferes with melatonin production, the hormone that signals your body it’s time to sleep.</li>
            <li><strong>Create a comfortable sleep environment:</strong> Invest in a good mattress, use blackout curtains, and keep your room at a cool temperature. A cool, dark, and quiet environment is ideal for sleep.</li>
            <li><strong>Exercise regularly:</strong> Physical activity during the day can help you fall asleep faster and enjoy deeper rest. However, avoid intense workouts close to bedtime as they can interfere with sleep.</li>
            <li><strong>Avoid caffeine and alcohol:</strong> Both caffeine and alcohol can disrupt your sleep patterns. Try to limit caffeine to the morning and avoid alcohol in the evening.</li>
          </ul>

          <h3>What to Do If You Can’t Sleep</h3>
          - **Don’t watch the clock**: If you can’t fall asleep, it can be tempting to check the time, but this can increase anxiety and make it even harder to sleep.
          - **Get out of bed**: If you’re awake for more than 20 minutes, get up and do something relaxing, like reading a book or listening to soft music, until you feel sleepy.

          Remember, small changes in your habits can lead to significant improvements in your sleep quality. Prioritize rest, and you'll see benefits in every area of your life.
        `,
    },
    {
        title: "The Benefits of Regular Exercise",
        description: "Discover how exercise can improve your physical and mental health.",
        image: "/assets/imagesForArticle/Exercise.png",
        content: `
          <h3>Physical Benefits of Exercise</h3>
          Exercise isn't just about weight loss—it's about building a healthier body. Regular physical activity improves cardiovascular health, strengthens muscles, and increases bone density. Additionally, it helps regulate blood sugar levels and supports weight management by boosting metabolism. Studies show that exercise can lower your risk of chronic diseases like type 2 diabetes, stroke, and certain cancers.

          <h3>Mental Health Advantages</h3>
          Exercise is a powerful mood booster. It reduces stress, anxiety, and symptoms of depression by triggering the release of endorphins—your body's natural "feel-good" chemicals. Over time, staying active can also improve self-confidence and mental clarity. Exercise has been linked to better sleep, improved cognitive function, and increased resilience to stress. Whether it’s a run, yoga, or even a brisk walk, physical activity has profound effects on your mental well-being.

          <h3>Types of Exercise</h3>
          - **Cardio:** Activities like running, cycling, or swimming improve heart health and endurance. Regular cardio helps lower blood pressure, reduce cholesterol levels, and promote fat loss.
          - **Strength Training:** Lifting weights or resistance exercises build muscle and enhance metabolism. Increased muscle mass helps improve bone density and maintain a healthy weight.
          - **Flexibility:** Yoga and stretching improve mobility, prevent injuries, and relieve tension. Adding flexibility exercises to your routine can also enhance posture and balance.
          - **Balance Exercises:** Balance training is essential for preventing falls, particularly as we age. Activities such as tai chi or simple balance exercises can improve stability and coordination.

          <h3>How Much Exercise Do You Need?</h3>
          Aim for at least 150 minutes of moderate-intensity exercise each week, such as brisk walking or cycling. Alternatively, aim for 75 minutes of vigorous-intensity activity, such as running or swimming. If you’re just starting out, it’s important to gradually increase your activity level and listen to your body. Even small amounts of physical activity can make a huge difference in your overall health.

          Find an activity you enjoy, and aim to incorporate regular exercise into your routine. The key is consistency, not perfection.
        `,
    },
    {
        title: "Eating Healthy on a Budget",
        description: "Find out how to maintain a nutritious diet without breaking the bank.",
        image: "/assets/imagesForArticle/eating.png",
        content: `
          <h3>Affordable Nutrition</h3>
          Eating healthy doesn't have to drain your wallet. By focusing on whole, unprocessed foods, you can create delicious, nutrient-packed meals that are budget-friendly. Staples like rice, beans, lentils, and seasonal produce are both affordable and versatile. Incorporating plant-based meals can also reduce costs, as meat is often the most expensive item on your shopping list.

          <h3>Meal Planning</h3>
          Meal planning is key to eating well on a budget. By creating a weekly menu, you can avoid impulse buys and minimize food waste. Planning ahead allows you to buy ingredients in bulk, which saves money in the long run. A well-organized shopping list will help you stay on track and avoid purchasing expensive processed foods.

          <h3>Smart Shopping Tips</h3>
          - Buy in bulk when possible, especially for items like grains, nuts, and spices.  
          - Look for discounts on frozen fruits and vegetables—they're just as nutritious as fresh.  
          - Choose store-brand or generic products when available, as they are often much cheaper than name-brand items.  
          - Avoid pre-packaged meals and snacks, which are often expensive and less healthy.

          <h3>Healthy Eating Strategies</h3>
          - **Cook at home**: Home-cooked meals are almost always cheaper and healthier than eating out. Try to cook in large batches and freeze leftovers for future meals.
          - **Buy in season**: Seasonal produce is often cheaper and more flavorful. Check out local farmers' markets for fresh, budget-friendly options.
          - **Use cheaper protein sources**: Beans, lentils, eggs, and canned fish are excellent sources of protein that are less expensive than meat.

          Eating healthy is all about making smart choices and being mindful of your budget. With a little planning and creativity, you can nourish your body without overspending.
        `,
    },
    {
        title: "Stress Management Techniques",
        description: "Learn practical ways to manage and reduce stress in your daily life.",
        image: "/assets/imagesForArticle/stress.png",
        content: `
      <h3>Understanding Stress</h3>
      Stress is your body's natural response to challenges, but chronic stress can lead to serious health problems. Symptoms include irritability, insomnia, and physical ailments like headaches and high blood pressure. Stress can affect your mind and body, leading to burnout and impacting overall well-being.

      Stress can be triggered by a variety of factors, including work pressures, financial struggles, family demands, and unexpected life changes. While short-term stress can be beneficial by improving focus and performance, prolonged or unmanaged stress can lead to serious health issues, such as heart disease, digestive problems, and mental health disorders like anxiety and depression.

      <h3>Why Stress Management Is Important</h3>
      Learning to manage stress is essential for maintaining good health. Chronic stress can contribute to high blood pressure, a weakened immune system, and mental health problems such as anxiety and depression. Managing stress effectively can improve your mood, increase your energy levels, and reduce your risk of health issues. It also allows you to be more productive and handle challenges with a clear mind.

      <h3>Effective Coping Strategies</h3>
      Here are some practical ways to manage and reduce stress:

      <ul>
        <li><strong>Mindfulness and Meditation:</strong> Practicing mindfulness or meditation helps you focus on the present moment and reduces anxiety. Techniques such as deep breathing and guided meditation can help calm your mind and lower stress levels.</li>
        <li><strong>Physical Activity:</strong> Regular exercise is one of the most effective ways to reduce stress. It lowers cortisol levels, the stress hormone, and releases endorphins, which improve mood and reduce anxiety.</li>
        <li><strong>Time Management:</strong> Stress often arises when we feel overwhelmed by our responsibilities. Prioritizing tasks, breaking them down into manageable steps, and learning to delegate can alleviate stress. Use tools like planners or digital calendars to stay organized.</li>
        <li><strong>Social Support:</strong> Spending time with friends and family or talking to a support group can significantly reduce stress. Social connections provide emotional support, offer advice, and create a sense of belonging.</li>
        <li><strong>Relaxation Techniques:</strong> Taking time to relax is crucial for managing stress. Activities like reading, listening to music, taking a warm bath, or practicing yoga can help calm the mind and body.</li>
      </ul>

      <h3>Identifying Stress Triggers</h3>
      To manage stress effectively, it’s important to identify its sources. Stressors can be external, like work pressures or relationship issues, or internal, such as negative thinking patterns. Once you identify what triggers your stress, you can develop strategies to either reduce or cope with those triggers.

      <h3>Building Resilience to Stress</h3>
      Building resilience means strengthening your ability to handle and recover from stress. This can be achieved through positive thinking, a strong support network, and healthy lifestyle habits. Resilience is not about eliminating stress but about developing the skills to manage it effectively.

      <h3>Additional Tips for Stress Relief</h3>
      - **Get enough sleep:** Lack of sleep can exacerbate stress, so it’s essential to prioritize good sleep hygiene.
      - **Eat a balanced diet:** Consuming nutrient-rich foods can boost your mood and energy levels, making it easier to cope with stress.
      - **Limit caffeine and alcohol:** Both caffeine and alcohol can increase feelings of anxiety and disrupt sleep patterns, so consume them in moderation.

      Remember, stress is a part of life, but it doesn’t have to control you. By incorporating these techniques into your routine, you can build resilience, improve your mental and physical health, and lead a more balanced life.
    `,
    }

];

const ArticlesPage = () => {
    const [selectedArticle, setSelectedArticle] = useState(null);

    const handleOpen = (article) => setSelectedArticle(article);
    const handleClose = () => setSelectedArticle(null);

    return (
        <div style={{ fontFamily: "'Roboto', sans-serif", padding: "20px" }}>
            <Typography variant="h4" gutterBottom style={{ textAlign: "center", margin: "20px 0" }}>
                Featured Articles
            </Typography>
            <Grid container spacing={4}>
                {articles.map((article, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardMedia component="img" height="140" image={article.image} alt={article.title} />
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {article.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {article.description}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    style={{ marginTop: "10px" }}
                                    onClick={() => handleOpen(article)}
                                >
                                    Read More
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={!!selectedArticle} onClose={handleClose} maxWidth="md" fullWidth>
                {selectedArticle && (
                    <>
                        <DialogTitle>{selectedArticle.title}</DialogTitle>
                        <DialogContent>
                            <img
                                src={selectedArticle.image}
                                alt={selectedArticle.title}
                                style={{
                                    width: "80%",
                                    height: "auto",
                                    marginBottom: "20px",
                                    borderRadius: "10px",
                                    display: "block",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                }}
                            />
                            <Typography
                                variant="body1"
                                style={{ lineHeight: "1.8", color: "#333" }}
                                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                            />
                        </DialogContent>
                    </>
                )}
            </Dialog>
        </div>
    );
};

export default ArticlesPage;
