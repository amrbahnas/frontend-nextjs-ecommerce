<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: #333;
            max-width: 75rem;
            margin: 0 auto;
            padding: 2rem;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 1rem 0;
          }
          th {
            background-color: #f4f4f4;
            text-align: left;
            padding: 1rem;
            font-weight: bold;
          }
          td {
            padding: 1rem;
            border-bottom: 1px solid #eee;
          }
          tr:hover {
            background-color: #f9f9f9;
          }
          h1 {
            color: #2c5282;
            margin-bottom: 1rem;
          }
          a {
            color: #2b6cb0;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          .stats {
            background-color: #ebf8ff;
            padding: 1rem;
            border-radius: 0.5rem;
            margin-bottom: 2rem;
          }
        </style>
      </head>
      <body>
        <h1>XML Sitemap</h1>
        <div class="stats">
          <p>
            Number of URLs: <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/>
          </p>
        </div>
        <table>
          <tr>
            <th>URL</th>
            <th>Last Modified</th>
            <th>Change Frequency</th>
            <th>Priority</th>
          </tr>
          <xsl:for-each select="sitemap:urlset/sitemap:url">
            <tr>
              <td>
                <a href="{sitemap:loc}">
                  <xsl:value-of select="sitemap:loc"/>
                </a>
              </td>
              <td><xsl:value-of select="sitemap:lastmod"/></td>
              <td><xsl:value-of select="sitemap:changefreq"/></td>
              <td><xsl:value-of select="sitemap:priority"/></td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
