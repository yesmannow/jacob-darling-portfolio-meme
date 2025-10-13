import React from "react";
import { Page, Text, View, Document, StyleSheet, Font } from "@react-pdf/renderer";
import resumeData from "../data/resume.json";

// Register fonts for better typography
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.woff2' },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.woff2', fontWeight: 'bold' }
  ]
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    color: "#1f2937",
    padding: 40,
    fontSize: 11,
    fontFamily: 'Inter',
    lineHeight: 1.4
  },
  header: {
    textAlign: "center",
    marginBottom: 25,
    borderBottom: "3px solid #3B82F6",
    paddingBottom: 15
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 5
  },
  title: {
    fontSize: 14,
    color: "#3B82F6",
    marginBottom: 8
  },
  contact: {
    fontSize: 10,
    color: "#6b7280",
    textAlign: "center"
  },
  summary: {
    backgroundColor: "#f8fafc",
    padding: 15,
    borderRadius: 8,
    borderLeft: "4px solid #3B82F6",
    marginBottom: 20,
    fontSize: 11,
    lineHeight: 1.5
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    backgroundColor: "#f1f5f9",
    padding: 15,
    borderRadius: 8
  },
  statItem: {
    textAlign: "center",
    flex: 1
  },
  statNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3B82F6",
    marginBottom: 2
  },
  statLabel: {
    fontSize: 8,
    color: "#6b7280"
  },
  section: {
    marginBottom: 18
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 10,
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: 3
  },
  jobContainer: {
    marginBottom: 12,
    paddingBottom: 8,
    borderBottom: "1px solid #f3f4f6"
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 5
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1f2937"
  },
  company: {
    fontSize: 11,
    color: "#3B82F6",
    fontWeight: "bold"
  },
  dates: {
    fontSize: 10,
    color: "#6b7280",
    textAlign: "right"
  },
  location: {
    fontSize: 9,
    color: "#9ca3af",
    textAlign: "right"
  },
  jobSummary: {
    fontSize: 10,
    color: "#4b5563",
    marginBottom: 5,
    lineHeight: 1.4
  },
  achievementsList: {
    marginLeft: 10
  },
  achievement: {
    fontSize: 9,
    color: "#4b5563",
    marginBottom: 2,
    lineHeight: 1.3
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5
  },
  skillTag: {
    backgroundColor: "#e0f2fe",
    color: "#0369a1",
    padding: "3 8",
    borderRadius: 4,
    fontSize: 9,
    marginBottom: 3
  },
  educationItem: {
    marginBottom: 8
  },
  degree: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1f2937"
  },
  institution: {
    fontSize: 10,
    color: "#3B82F6",
    fontWeight: "bold"
  },
  year: {
    fontSize: 9,
    color: "#6b7280"
  },
  twoColumn: {
    flexDirection: "row",
    gap: 20
  },
  leftColumn: {
    flex: 2
  },
  rightColumn: {
    flex: 1
  }
});

export const ResumePDF = () => {
  const { name, title, summary, contact, experience, skills, tools, education, stats } = resumeData;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.contact}>
            {contact.location} | {contact.email} | {contact.linkedin}
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.experience}</Text>
            <Text style={styles.statLabel}>Years Experience</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.practitioners}</Text>
            <Text style={styles.statLabel}>Practitioners Served</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.caseStudies}</Text>
            <Text style={styles.statLabel}>Case Studies</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.customApps}</Text>
            <Text style={styles.statLabel}>Custom Apps Built</Text>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.summary}>
          <Text>{summary}</Text>
        </View>

        {/* Two Column Layout */}
        <View style={styles.twoColumn}>
          {/* Left Column - Experience */}
          <View style={styles.leftColumn}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Experience</Text>
              {experience.map((job, index) => (
                <View key={index} style={styles.jobContainer}>
                  <View style={styles.jobHeader}>
                    <View>
                      <Text style={styles.jobTitle}>{job.role}</Text>
                      <Text style={styles.company}>{job.company}</Text>
                    </View>
                    <View>
                      <Text style={styles.dates}>{job.dates}</Text>
                      <Text style={styles.location}>{job.location}</Text>
                    </View>
                  </View>
                  <Text style={styles.jobSummary}>{job.summary}</Text>
                  <View style={styles.achievementsList}>
                    {job.achievements.slice(0, 3).map((achievement, idx) => (
                      <Text key={idx} style={styles.achievement}>
                        • {achievement}
                      </Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Right Column - Skills & Education */}
          <View style={styles.rightColumn}>
            {/* Skills */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Core Skills</Text>
              <View style={styles.skillsContainer}>
                {skills.map((skill, index) => (
                  <Text key={index} style={styles.skillTag}>
                    {skill}
                  </Text>
                ))}
              </View>
            </View>

            {/* Tools */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Technologies</Text>
              <View style={styles.skillsContainer}>
                {tools.map((tool, index) => (
                  <Text key={index} style={styles.skillTag}>
                    {tool}
                  </Text>
                ))}
              </View>
            </View>

            {/* Education */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {education.map((edu, index) => (
                <View key={index} style={styles.educationItem}>
                  <Text style={styles.degree}>{edu.degree}</Text>
                  <Text style={styles.institution}>{edu.institution}</Text>
                  <Text style={styles.year}>{edu.year}</Text>
                  {edu.details && (
                    <Text style={[styles.year, { marginTop: 2 }]}>{edu.details}</Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
